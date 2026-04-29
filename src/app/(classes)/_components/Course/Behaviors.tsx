import { useRouter } from 'next/navigation';
import { sortStudents, convertBehaviorPriorityGrade, calcBehaviorGrade, convertBehaviorPriorityGradeColor } from '@/app/lib/grading';
import { Student, Behavior } from '@/app/lib/definitions';

export default function Behaviors({ students, behaviors }: { students: Student[], behaviors: Behavior[] }) {
    const router = useRouter();
    return (
        <div id="studentsBehaviorConC" className="whiteBox w-[85%] xs:w-[80%] sm:w-[75%] md:w-full 2xl:w-[90%]  overflow-hidden">
            <div className="subTitleConC p-2 bg-blue-500 text-white rounded-t-lg text-center">
                <h2 className="subTitleC font-subtitle text-xl font-bold">Behaviors</h2>
            </div>
            {students
                .sort((s1, s2) => sortStudents(s1, s2))
                .map((student, index) => {
                    const studentBehavior = behaviors.find((behavior) => behavior.studentId === student.id);
                    const finalBehavior = convertBehaviorPriorityGrade(calcBehaviorGrade(studentBehavior?.attention, studentBehavior?.learnability, studentBehavior?.cooperation));
                    const finalBehaviorColor = convertBehaviorPriorityGradeColor(finalBehavior);
                    return (
                        <div
                            className={`studentCon flex justify-between items-center gap-2 p-2 ${finalBehaviorColor} ${index < students.length - 1 ? 'border-b border-gray-300' : ''} cursor-pointer hover:opacity-80 transition-opacity duration-300`}
                            key={`studentClass${index}`}
                            onClick={() => router.push(`/students/${student.id}`)}
                        >
                            <h3 className="studentNameC font-subtitle text-md font-bold">{student.lastName}, {student.firstName}</h3>
                            <h4 className="studentGradeC font-subtitle">{finalBehavior}</h4>
                        </div>
                    );
                })
            }
        </div>
    )
}