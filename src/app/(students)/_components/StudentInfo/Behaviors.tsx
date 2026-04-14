import { useState } from 'react';
import { calcBehaviorGrade, convertBehaviorPriorityGrade, convertBehaviorPriorityGradeColor, convertBehaviorGrade } from '@/app/lib/grading';
import { Behavior } from '@/app/lib/definitions';

import './StudentInfo.css';

export default function Behaviors({ behaviors }: { behaviors: Behavior[] }) {
    const [bToggle, setBToggle] = useState<boolean[]>(behaviors.map(() => false));

    const handleBehavior = (index: number) => {
        setBToggle(prev => {
            const newToggle = [...prev];
            newToggle[index] = !newToggle[index];
            return newToggle;
        });
    }
    return (
        <div id="behaviorConSP" className="whiteBox min-w-[100%] overflow-hidden">
            <div id="behaviorHeaderConSP" className="bg-blue-500 text-white p-2 rounded-t-lg text-center">
                <h2 id="behaviorTitleSP" className="font-subtitle text-xl font-bold">Behavior</h2>
            </div>
            <div id="behaviorInfoConSPBody">
                {behaviors.map((behavior, index) => {
                    let behaviorGrade: number | 'N/A' = calcBehaviorGrade(behavior.attention, behavior.learnability, behavior.cooperation);
                    let behaviorPriorityGrade = convertBehaviorPriorityGrade(behaviorGrade);
                    let behaviorPriorityGradeColor = convertBehaviorPriorityGradeColor(behaviorPriorityGrade);
                    return (
                        <div className={`behaviorInfoConSP ${index < behaviors.length - 1 ? 'border-b border-gray-300' : ''} `} key={`behaviorConSP${index}`}>
                            <div
                                className={`behaviorInfoHeaderConSP flex justify-between items-center p-2 cursor-pointer hover:opacity-80 transition-opacity duration-300 ${behaviorPriorityGradeColor}`}
                                onClick={() => handleBehavior(index)}
                            >
                                <div className="behaviorInfoHeaderConLeftSP">
                                    <h3 className={`behaviorInfoSP font-subtitle text-md font-bold`}> {behavior.courseName}</h3>
                                </div>
                                <div className="behaviorInfoHeaderConRightSP ">
                                    <h3 className="behaviorInfoSP font-subtitle text-md">Priority: <b>{behaviorPriorityGrade}</b></h3>
                                </div>
                            </div>
                            <div className={`behaviorInfoConBodySP flex flex-col justify-start items-start gap-1 p-2 pb-4 pt-1 ${behaviorPriorityGradeColor} ${bToggle[index] ? 'block' : 'hidden'} transition-all duration-300`}>
                                <h3 className="behaviorInfoSP font-subtitle pl-10">Attention: <b>{convertBehaviorGrade(behavior.attention)}</b></h3>
                                <h3 className="behaviorInfoSP font-subtitle pl-10">Learnability: <b>{convertBehaviorGrade(behavior.learnability)}</b></h3>
                                <h3 className="behaviorInfoSP font-subtitle pl-10">Cooperation: <b>{convertBehaviorGrade(behavior.cooperation)}</b></h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}