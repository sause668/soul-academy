import { sortAssignments } from '@/app/lib/grading';
import { formatDateShort, typeToString } from '@/app/lib/typeConversion';
import { Assignment } from '@/app/lib/definitions';

export default function Assignments({ assignments, quarter }: { assignments: Assignment[], quarter: number }) {
    return (
        <div id="assignmentsConC" className="whiteBox w-[95%] xs:w-[90%] sm:w-[85%] md:w-[95%] 2xl:w-[90%] overflow-hidden">
            <div className="subTitleConC p-2 bg-blue-500 text-white rounded-t-lg text-center">
                <h2 className="subTitleC font-subtitle text-xl font-bold">Assignments</h2>
            </div>
            {assignments
                .filter(a => a.quarter == quarter)
                .sort((a1, a2) => sortAssignments(a1, a2))
                .map((assignment, index) => (
                    <div className={`assignConC p-2 flex justify-between items-center ${assignment.type} ${index < assignments.filter(a => a.quarter == quarter).length - 1 ? 'border-b border-gray-300' : ''}`} key={`assignClass${index}`}>
                        <div className="assignInfoConC flex flex-col justify-flex-start items-flex-start gap-1">
                            <h3 className="assignNameC font-subtitle text-md font-bold">{assignment.name}</h3>
                            <h4 className="assignTypeC font-body text-md text-zinc-500">{typeToString(assignment.type ?? '')}</h4>
                        </div>
                        <h4 className="assignDueDateC font-body">{formatDateShort(assignment.dueDate)}</h4>
                    </div>
                ))
            }
        </div>
    )
}