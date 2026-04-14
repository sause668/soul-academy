import { Assignment } from "@/app/lib/definitions";
import { sortAssignments, calcLetterGrade } from "@/app/lib/grading";
import { formatDateShort, typeToString } from "@/app/lib/typeConvertion";
import './CourseStudent.css';

export default function Assignments({ assignments, quarter }: { assignments: Assignment[], quarter: number }) {
    return (
        <div id="assignmentsConC" className="whiteBox w-full overflow-hidden">
            <div className="subTitleConC p-2 bg-blue-500 text-white rounded-t-lg text-center">
                <h2 className="subTitleC text-xl font-bold">Assignments</h2>
            </div>
            {assignments
                .filter(a => a.quarter == quarter)
                .sort((a1, a2) => sortAssignments(a1, a2))
                .map((assignment, index) => {
                    const grade = assignment.grade ?? 'N/A';
                    const letterGrade = calcLetterGrade(grade ?? 'N/A');
                    return (
                        <div className={`assignConC p-2 flex justify-between items-center ${grade != 'N/A' ? letterGrade : 'noGrade'} ${index < assignments.filter(a => a.quarter == quarter).length - 1 ? 'border-b border-gray-300' : ''}`} key={`assignClass${index}`}>
                            <div className="assignInfoConC flex flex-col justify-flex-start items-flex-start gap-1">
                                <h3 className="assignNameC font-subtitle text-lg font-bold">{assignment.name}</h3>
                                <h4 className="assignTypeC font-subtitle text-md text-zinc-500">{typeToString(assignment.type ?? '')}</h4>
                                {/* <h4 className="assignDueDateC font-subtitle text-xs text-zinc-500">{formatDateShort(assignment.dueDate)}</h4> */}
                            </div>
                            <h4 className={`assignGradeC font-subtitle text-lg font-bold `}>{grade} ({letterGrade})</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}