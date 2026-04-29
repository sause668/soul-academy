import { convertBehaviorGrade, convertBehaviorPriorityGrade, convertBehaviorGradeColor, convertBehaviorPriorityGradeColor, calcBehaviorGrade } from "@/app/lib/grading";
import { Behavior } from "@/app/lib/definitions";

export default function StudentBehavior({ behavior }: { behavior: Behavior }) {
    const attentionGrade = behavior?.attention ? convertBehaviorGrade(behavior.attention) : 'N/A';
    const learnabilityGrade = behavior?.learnability ? convertBehaviorGrade(behavior.learnability) : 'N/A';
    const cooperationGrade = behavior?.cooperation ? convertBehaviorGrade(behavior.cooperation) : 'N/A';
    const priorityGrade = behavior?.attention && behavior?.learnability && behavior?.cooperation ? convertBehaviorPriorityGrade(calcBehaviorGrade(behavior.attention, behavior.learnability, behavior.cooperation)) : 'N/A';

    return (
        <div id="behaviorsConC" className="whiteBox flex flex-col justify-flex-start items-center w-[80%] overflow-hidden">
            <h2 id="behaviorsTitleC" className="text-xl font-bold text-center bg-blue-500 font-subtitle text-white rounded-t-lg p-2 w-full">Behavior</h2>
            <div id="behaviorsListConC" className="flex flex-col justify-flex-start items-start w-full">
                <div id="attentionConC" className={`flex justify-between items-center text-md p-2 px-4 w-full border-b border-gray-300 ${convertBehaviorGradeColor(attentionGrade)}`}>
                    <h3 id="attentionTitleC" className={`font-subtitle`}>Attention:</h3>
                    <h3 id="attentionGradeC" className={`font-subtitle`}>{attentionGrade}</h3>
                </div>
                <div id="learnabilityConC" className={`flex justify-between items-center text-md p-2 px-4 w-full border-b border-gray-300 ${convertBehaviorGradeColor(learnabilityGrade)}`}>
                    <h3 id="learnabilityTitleC" className={`font-subtitle`}>Learnability:</h3>
                    <h3 id="learnabilityGradeC" className={`font-subtitle`}>{learnabilityGrade}</h3>
                </div>
                <div id="cooperationConC" className={`flex justify-between items-center text-md p-2 px-4 w-full border-b border-gray-400 ${convertBehaviorGradeColor(cooperationGrade)}`}>
                    <h3 id="cooperationTitleC" className={`font-subtitle`}>Cooperation:</h3>
                    <h3 id="cooperationGradeC" className={`font-subtitle`}>{cooperationGrade}</h3>
                </div>
                <div id="priorityConC" className={`flex justify-between items-center text-md p-2 px-4  w-full ${convertBehaviorPriorityGradeColor(priorityGrade)}`}>
                    <h3 id="priorityTitleC" className={`font-subtitle text-lg font-bold`}>Priority:</h3>
                    <h3 id="priorityGradeC" className={`font-subtitle text-lg font-bold`}>{priorityGrade}</h3>
                </div>
            </div>
        </div>
    )
}