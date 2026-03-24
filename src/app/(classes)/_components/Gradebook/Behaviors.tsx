import { useRouter } from "next/navigation";
import OpenModalTableCell from "@/app/(_home)/_components/OpenModalComponents/OpenModalTableCell";
import EditBehaviorModal from "./Modals/EditBehaviorModal";
import CreateBehaviorModal from "./Modals/CreateBehaviorModal";
import { convertBehaviorGrade, sortStudents, calcBehaviorGrade, convertBehaviorPriorityGrade, convertBehaviorPriorityGradeColor, convertBehaviorGradeColor } from "@/app/lib/grading";
import { Behavior, Student } from "@/app/lib/definitions";
import './Gradebook.css';

export default function Behaviors({ behaviors, students, courseId }: { behaviors: Behavior[], students: Student[], courseId: number }) {
    const router = useRouter();
    const behaviorAssignments = [
        { id: 'attention', name: 'Attention', type: 'behavior', quarter: 1 },
        { id: 'learnability', name: 'Learning Speed', type: 'behavior', quarter: 1 },
        { id: 'cooperation', name: 'Cooperation', type: 'behavior', quarter: 1 }
    ];
    return (
        <div id="tableConGB" className="whiteBox p-2">
            <div id="tableFormatConGB">
                <div id="tableStudentsConGB" className="">
                    <table id="tableGBS">
                        <thead id="tableHeadGB">
                            <tr id="tableHeadRowGB">
                                <td className="font-bold text-center cursor-default text-xl">Behaviors</td>
                            </tr>
                        </thead>
                        <tbody id="tableBodyGB">
                            {students.sort((s1, s2) => sortStudents(s1, s2)).map((student, iStudent) => (
                                <tr className="tableBodyRowGB" key={`studentName${iStudent}`}>
                                    <td className="tableCellGB tableBodyCellGB studentBodyCellGB"
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
                            <tr id="tableHeadRowBB">
                                {behaviorAssignments.map((assignment, index) => (
                                    <td className="tableCellGB tableCellBB tableHeadCellGB bg-gray-200 font-bold cursor-default" key={`assignHead${index}`}>{assignment.name}</td>
                                ))}
                                <td className="tableCellGB tableCellBB tableHeadCellGB finalHeadCellGB bg-slate-300 text-lg font-bold">Priority Level</td>
                            </tr>
                        </thead>
                        <tbody id="tableBodyGB">
                            {students
                                .sort((s1, s2) => sortStudents(s1, s2))
                                .map((student, iStudent) => {
                                    // Calculate final grade using behavior assignments
                                    const studentBehavior = behaviors.find((behavior) => behavior.studentId === student.id);
                                    const attentionGrade = convertBehaviorGrade(studentBehavior?.attention);
                                    const learnabilityGrade = convertBehaviorGrade(studentBehavior?.learnability);
                                    const cooperationGrade = convertBehaviorGrade(studentBehavior?.cooperation);
                                    let studentBehaviorsString = [attentionGrade, learnabilityGrade, cooperationGrade];
                                    let behaviorGrade: number | 'N/A' = calcBehaviorGrade(studentBehavior?.attention ?? 0, studentBehavior?.learnability ?? 0, studentBehavior?.cooperation ?? 0);
                                    let behaviorPriorityGrade = convertBehaviorPriorityGrade(behaviorGrade);
                                    let behaviorPriorityGradeColor = convertBehaviorPriorityGradeColor(behaviorPriorityGrade);
                                    return (
                                        <tr className="tableBodyRowGB cursor-pointer hover:opacity-80 transition-opacity duration-300" key={`studentName${iStudent}`}>
                                            {studentBehaviorsString.map((behavior, index) => (
                                                <OpenModalTableCell
                                                    cellText={behavior == 'N/A' ? '' : behavior}
                                                    modalComponent={behavior == 'N/A' ? 
                                                        <CreateBehaviorModal courseId={courseId} student={student} />
                                                    : <EditBehaviorModal behavior={studentBehavior ?? {}} courseId={courseId} /> }
                                                    cssClasses={`tableCellGB tableCellBB tableBodyCellGB gradeBodyCellGB ${behavior ? convertBehaviorGradeColor(behavior) : 'noGrade'}`}
                                                    key={`behaviorGB${iStudent}${index}`}
                                                />
                                            ))}
                                            {behaviorGrade != 'N/A' ?
                                                <td className={`tableCellGB tableCellBB tableBodyCellGB finalBodyCellGB font-bold ${behaviorPriorityGradeColor}`}>{behaviorPriorityGrade}</td>
                                                :
                                                <td className={`tableCellGB tableCellBB tableBodyCellGB finalBodyCellGB noGrade font-bold`}>N/A</td>
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