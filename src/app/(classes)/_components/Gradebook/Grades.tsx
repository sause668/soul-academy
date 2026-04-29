import { useRouter } from "next/navigation";
import AssignmentInfo from "./Modals/AssignmentModals/AssignmentInfoModal";
import CreateGradeModal from "./Modals/GradeModals/CreateGradeModal";
import EditGradeModal from "./Modals/GradeModals/EditGradeModal";
import OpenModalTableCell from "@/app/(_home)/_components/OpenModalComponents/OpenModalTableCell";
import { calcFinalGradeTeacher, calcLetterGrade, sortAssignments, sortStudents } from "@/app/lib/grading";
import { Assignment, Student } from "@/app/lib/definitions";
import './Gradebook.css';

export default function Grades({ assignments, students, quarter, courseId }: { assignments: Assignment[], students: Student[], quarter: number, courseId: number }) {
    const router = useRouter();
    return (
        <div id="tableConGB" className="whiteBox md:p-2">
            <div id="tableFormatConGB" className=" grid grid-cols-[auto_auto] grid-rows-[auto] bg-screenWhite max-w-full m-2">
                <div id="tableStudentsConGB" className="flex flex-col justify-end w-[160px]">
                    <table id="tableGBS">
                        <thead id="tableHeadGB">
                            <tr id="tableHeadRowGB">
                                <td className="pb-4 cursor-default font-subtitle font-bold text-center text-2xl underline">Grades</td>
                            </tr>
                        </thead>
                        <tbody id="tableBodyGB" className="">
                            {students.sort((s1, s2) => sortStudents(s1, s2)).map((student, iStudent) => (
                                <tr className="tableBodyRowBG" key={`studentName${iStudent}`}>
                                    <td
                                        className="tableCellGB tableBodyCellGB font-subtitle bg-[#78909c10] cursor-pointer"
                                        onClick={() => router.push(`/students/${student.id}`)}
                                    >{student.lastName}, {student.firstName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="tableGradesConGB" className="overflow-y-scroll">
                    <table id="tableGB">
                        <thead id="tableHeadGB">
                            <tr id="tableHeadRowGB">
                                {assignments
                                    .filter(a => a.quarter == quarter)
                                    .sort((a1, a2) => sortAssignments(a1, a2))
                                    .map((assignment, index) => (
                                        <OpenModalTableCell
                                            cellText={assignment.name}
                                            modalComponent={<AssignmentInfo assignment={assignment} quarter={quarter} courseId={courseId} />}
                                            cssClasses={`tableCellGB tableHeadCellGB assignHeadCellGB font-subtitle font-bold ${assignment.type}`}
                                            key={`assignHead${index}`}
                                        />
                                    ))}
                                <td className="tableCellGB tableHeadCellGB finalHeadCellBG text-lg font-subtitle font-bold">Final</td>
                            </tr>
                        </thead>
                        <tbody id="tableBodyGB">
                            {students
                                .sort((s1, s2) => sortStudents(s1, s2))
                                .map((student, iStudent) => {
                                    let finalGrade: number | 'N/A' = calcFinalGradeTeacher(assignments.filter(a => a.quarter == quarter), student.id ?? 0);
                                    let finalLetterGrade = calcLetterGrade(finalGrade);
                                    return (
                                        <tr className="tableBodyRowBG" key={`studentName${iStudent}`}>
                                            {assignments
                                                .filter(a => a.quarter === quarter)
                                                .sort((a1, a2) => sortAssignments(a1, a2))
                                                .map((assignment, iAssignment) => {
                                                    let grade = assignment.grades?.find((grade) => {
                                                        return grade.studentId == student.id
                                                    })
                                                    if (grade) {
                                                        let letterGrade = calcLetterGrade(grade.grade ?? 'N/A')
                                                        return <OpenModalTableCell
                                                            cellText={`${grade.grade} (${letterGrade})`}
                                                            key={`grade${iStudent}${iAssignment}`}
                                                            cssClasses={`tableCellGB tableBodyCellGB gradeBodyCellBG font-body ${letterGrade} hover:opacity-80 transition-opacity duration-300`}
                                                            modalComponent={<EditGradeModal assignmentId={assignment.id ?? 0} studentId={student.id ?? 0} grade={grade.grade ?? 0} courseId={courseId} />}
                                                        />
                                                    }
                                                    return <OpenModalTableCell
                                                        cellText={''}
                                                        key={`grade${iStudent}${iAssignment}`}
                                                        cssClasses={'tableCellGB tableBodyCellGB gradeBodyCellBG noGrade'}
                                                        modalComponent={<CreateGradeModal assignmentId={assignment.id ?? 0} studentId={student.id ?? 0} courseId={courseId} />}
                                                    />
                                                })}
                                            {finalGrade != 'N/A' ?
                                                <td className={`tableCellGB tableBodyCellGB finalBodyCellGB font-subtitle f${finalLetterGrade}`}>{finalGrade} ({finalLetterGrade})</td>
                                                :
                                                <td className={`tableCellGB tableBodyCellGB finalBodyCellGB noGrade font-subtitle`}>N/A</td>
                                            }
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}