import { useRouter } from 'next/navigation';
import { Student, Assignment } from '@/app/lib/definitions';
import { sortStudents, calcFinalGradeTeacher, calcLetterGrade } from '@/app/lib/grading';
import './Course.css';

export default function Grades({ students, assignments, quarter }: { students: Student[], assignments: Assignment[], quarter: number }) {
    const router = useRouter();
    return (
        <div id="studentsConC" className="whiteBox w-[80%] overflow-hidden">
            <div className="subTitleConC p-2 bg-blue-500 text-white rounded-t-lg text-center">
                <h2 className="subTitleC text-xl font-bold">Students</h2>
            </div>
            {students
                .sort((s1, s2) => sortStudents(s1, s2))
                .map((student, index) => {
                    let finalGrade: number | 'N/A' = student.id ? calcFinalGradeTeacher(assignments.filter(a => a.quarter == quarter), student.id) : 'N/A';
                    let finalLetterGrade = calcLetterGrade(finalGrade);
                    return (
                        <div
                            className={`studentCon flex justify-between items-center gap-2 p-2 ${finalGrade != 'N/A' ? finalLetterGrade : 'noGrade'} ${index < students.length - 1 ? 'border-b border-gray-300' : ''} cursor-pointer hover:opacity-80 transition-opacity duration-300`}
                            key={`studentClass${index}`}
                            onClick={() => router.push(`/students/${student.id}`)}
                        >
                            <h3 className="studentNameC text-md font-bold">{student.lastName}, {student.firstName}</h3>
                            <h4 className="studentGradeC">{finalGrade != 'N/A' ? `${finalGrade} (${finalLetterGrade})` : 'N/A'}</h4>
                        </div>
                    );
                })
            }
        </div>
    )
}