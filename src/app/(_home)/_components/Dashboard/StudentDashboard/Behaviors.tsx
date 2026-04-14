import { Behavior } from "@/app/lib/definitions";
import { convertBehaviorPriorityGrade, calcBehaviorGrade, convertBehaviorPriorityGradeColor } from "@/app/lib/grading";

export default function Behaviors({ behaviors }: { behaviors: Behavior[] }) {
    return (
        <div id="behaviorConDB" className="whiteBox w-full overflow-hidden">
            <h2 id="behaviorTitleDB" className="text-xl text-center font-bold bg-blue-500 font-subtitle text-white p-2 rounded-t-lg">Behavior</h2>
            <div id="behaviorListDB" className="flex flex-col justify-flex-start items-flex-start">
                {behaviors.map((behavior, index) => {
                    const priorityGrade = convertBehaviorPriorityGrade(calcBehaviorGrade(behavior.attention ?? 0, behavior.learnability ?? 0, behavior.cooperation ?? 0));
                    const priorityGradeColor = convertBehaviorPriorityGradeColor(priorityGrade);
                    return (
                        <div id="behaviorListItemDB" className={`flex justify-between items-center p-2 px-4 w-full ${index < behaviors.length - 1 ? 'border-b border-gray-300' : ''} ${priorityGradeColor} hover:opacity-80 transition-opacity duration-300 cursor-pointer`} key={`behaviorGradeT${index}`}>
                            <h3 id="behaviorTitleDB" className={`font-subtitle text-md font-bold`}>{behavior.courseName}</h3>
                            <h3 id="behaviorGradeDB" className={`font-subtitle text-md `}>{priorityGrade}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}