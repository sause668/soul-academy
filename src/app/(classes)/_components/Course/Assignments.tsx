import { Assignment, Student } from '@/app/lib/definitions';
import { sortAssignments } from '@/app/lib/grading';
import { formatDateShort, typeToString } from '@/app/lib/typeConvertion';
import './Course.css';

export default function Assignments({ assignments, students, quarter }: { assignments: Assignment[], students: Student[], quarter: number }) {
    return (
        <div id="assignmentsConC" className="whiteBox w-[80%] overflow-hidden">
            <div className="subTitleConC p-2 bg-blue-500 text-white rounded-t-lg text-center">
                <h2 className="subTitleC text-xl font-bold">Assignments</h2>
            </div>
            {assignments
                .filter(a => a.quarter == quarter)
                .sort((a1, a2) => sortAssignments(a1, a2))
                .map((assignment, index) => (
                    <div className={`assignConC p-2 flex justify-between items-center ${assignment.type} ${index < assignments.filter(a => a.quarter == quarter).length - 1 ? 'border-b border-gray-300' : ''}`} key={`assignClass${index}`}>
                        <div className="assignInfoConC flex flex-col justify-flex-start items-flex-start gap-1">
                            <h3 className="assignNameC text-md font-bold">{assignment.name}</h3>
                            <h4 className="assignTypeC text-md text-zinc-500">{typeToString(assignment.type ?? '')}</h4>
                        </div>
                        <h4 className="assignDueDateC">{formatDateShort(assignment.dueDate)}</h4>
                    </div>
                ))
            }
        </div>
    )
}