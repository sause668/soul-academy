import { useState } from 'react';
import { calcFinalGradeStudent, calcLetterGrade, sortAssignments } from '@/app/lib/grading';
import { Course } from '@/app/lib/definitions';
import './StudentInfo.css';

export default function Courses({ courses, quarter }: { courses: Course[], quarter: number }) {

    const [cToggle, setCToggle] = useState<boolean[]>(courses.map(() => false));

    const handleClass = (index: number) => {
        setCToggle(prev => {
            const newToggle = [...prev];
            newToggle[index] = !newToggle[index];
            return newToggle;
        });
    }
    return (
        <div id="classesConSP" className="whiteBox min-w-full overflow-hidden">
            <div id="classesHeaderConSP" className="bg-blue-500 text-white p-2 rounded-t-lg text-center">
                <h2 id="classesTitleSP" className="font-subtitle text-xl font-bold">Classes</h2>
            </div>
            <div id="classesBodyConSP">
                {courses.map((course, index) => {
                    let finalGrade: number | 'N/A' = calcFinalGradeStudent(course.assignments ?? []);
                    let finalLetterGrade: string | 'N/A' = calcLetterGrade(finalGrade);
                    return (
                        <div className={`classConSP ${index < courses.length - 1 ? 'border-b border-gray-300' : ''}`} key={`classConS${index}`}>
                            <div className={`classInfoConSP flex justify-between items-center p-2 cursor-pointer hover:opacity-80 transition-opacity duration-300 ${finalGrade != 'N/A' ? finalLetterGrade : 'noGrade'} `} onClick={() => handleClass(index)}>
                                <div className={`classInfoConLeftSP flex flex-col justify-start items-start g-0 `}>
                                    <h3 className="classInfoSP font-subtitle text-xl font-bold p-0 m-0">{course.grade}th Grade {course.name}</h3>
                                    <h4 className="classInfoSP font-subtitle text-md p-0 m-0">{course.teacher?.lastName}, {course.teacher?.firstName}</h4>
                                    <h4 className="classInfoSP font-subtitle font-body text-md text-zinc-500 p-0 m-0">Period {course.period}: Room - {course.room}</h4>
                                </div>
                                <div className="classInfoConRightSP">
                                    <h4 className="currentGradeSP font-subtitle text-xl font-bold">Current Grade: {finalGrade} ({finalLetterGrade})</h4>
                                </div>
                            </div>
                            <div className={`classAssignmentsConSP flex justify-center items-start gap-2 flex-wrap p-2 ${cToggle[index] ? 'block' : 'hidden'} transition-all duration-300`}>
                                {course.assignments && course.assignments
                                    .filter(a => a.quarter == quarter)
                                    .sort((a1, a2) => sortAssignments(a1, a2))
                                    .map((assignment, index) => (
                                        <div className="assignmentGridConSP w-[30%]" key={`classAssignment${index}`}>
                                            <div className={`assignmentConSP p-2 rounded-lg ${assignment.type}`}>
                                                <h3 className="assignNameSP font-subtitle text-lg font-bold">{assignment.name}</h3>
                                                <h4 className="assignDueDateSP font-subtitle text-sm text-zinc-500 mb-2">Due Date: {assignment.dueDate?.toLocaleDateString()}</h4>
                                                <h4 className={`assignGradeSP font-subtitle text-md font-bold`}>Grade: {assignment.grade} ({calcLetterGrade(assignment.grade ?? 'N/A')})</h4>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}