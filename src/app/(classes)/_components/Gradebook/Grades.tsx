import OpenModalTableCell from "@/app/(_home)/_components/OpenModalComponents/OpenModalTableCell";
import AssignmentInfo from "./Modals/AssignmentInfoModal";
import { Assignment, Student } from "@/app/lib/definitions";
import { calcFinalGradeTeacher, calcLetterGrade, sortAssignments, sortStudents } from "@/app/lib/grading";
import './Gradebook.css';
import { useRouter } from "next/navigation";

export default function Grades({ assignments, students, quarter, courseId }: { assignments: Assignment[], students: Student[], quarter: number, courseId: number }) {
    const router = useRouter();
    return (
        <div id="tableConGB" className="whiteBox p-2">
            <div id="tableFormatConGB" className="">
                <div id="tableStudentsConGB" className="h-full">
                    <table id="tableGBS">
                        {/* <thead id="tableHeadGB">
                        <tr id="tableHeadRowGB">
                        <td className="font-bold text-center cursor-default text-2xl font-sour-gummy">Grade Book</td>
                        </tr>
                        </thead> */}
                        <tbody id="tableBodyGB" className="">
                            {students.sort((s1, s2) => sortStudents(s1, s2)).map((student, iStudent) => (
                                <tr className="tableBodyRowBG " key={`studentName${iStudent}`}>
                                    <td
                                        className="tableCellGB tableBodyCellGB studentBodyCellGB"
                                        onClick={() => router.push(`/students/${student.id}`)}
                                    >{student.lastName}, {student.firstName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="tableGradesConGB">
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
                                            cssClasses={`tableCellGB tableHeadCellGB assignHeadCellGB font-bold ${assignment.type}`}
                                            key={`assignHead${index}`}
                                        />
                                    ))}
                                <td className="tableCellGB tableHeadCellGB finalHeadCellBG text-lg font-bold">Final</td>
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
                                                            cssClasses={`tableCellGB tableBodyCellGB gradeBodyCellBG ${letterGrade} hover:opacity-80 transition-opacity duration-300`}
                                                            modalComponent={'<EditGradeModal grade={grade} />'}
                                                        />
                                                    }
                                                    return <OpenModalTableCell
                                                        cellText={''}
                                                        key={`grade${iStudent}${iAssignment}`}
                                                        cssClasses={'tableCellGB tableBodyCellGB gradeBodyCellBG noGrade'}
                                                        modalComponent={''}
                                                        // modalComponent={<CreateGradeModal
                                                        //     assignmentId={assignment.id}
                                                        //     studentId={student.id}
                                                        // />}
                                                    />
                                                })}
                                            {finalGrade != 'N/A' ?
                                                <td className={`tableCellGB tableBodyCellGB finalBodyCellGB f${finalLetterGrade}`}>{finalGrade} ({finalLetterGrade})</td>
                                                :
                                                <td className={`tableCellGB tableBodyCellGB finalBodyCellGB noGrade`}>N/A</td>
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