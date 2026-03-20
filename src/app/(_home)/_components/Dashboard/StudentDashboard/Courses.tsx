import { Course } from "@/app/lib/definitions";
import { calcFinalGradeStudent, calcLetterGrade } from "@/app/lib/grading";
import { nameToString } from "@/app/lib/typeConvertion";
import { useRouter } from "next/navigation";


export default function Courses({ courses }: { courses: Course[] }) {
    const router = useRouter();
    const classHeaders = [
        {
            header: 'Period',
            key: 'period',
        },
        {
            header: 'Room',
            key: 'room',
        },
        {
            header: 'Class',
            key: 'name',
        },
        {
            header: 'Teacher',
            key: 'teacher',
        },
        {
            header: 'Grade',
            key: 'grade',
        },
    ]
    return (
        <div id="classesConDB" className="whiteBox flex flex-col justify-flex-start items-flex-start ">
            <div id="classTitleConDB" className="flex justify-between items-center p-2 bg-blue-500 text-white rounded-t-lg">
                <h3 id="classTitleDB" className="text-xl font-bold">Current Classes</h3>
            </div>
            <div id="classTableConDB" className="w-full">
                <table id="classTableDB" className="w-full">
                    <thead>
                        <tr className="bg-gray-200 text-black border-b border-gray-300">
                            {classHeaders.map((header, index) => (
                                <th className={`classTableHeaderDB${index} `} key={`classTableHeaderT${index}`}>{header.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => {
                            const finalLetterGrade = calcLetterGrade(course.finalGrade as number);
                            return (
                                <tr
                                    key={`classRowT${index}`}
                                    className={`${course.finalGrade != 'N/A' ? finalLetterGrade : 'noGrade'} ${index < courses.length - 1 ? 'border-b border-gray-300' : ''} hover:opacity-80 transition-opacity duration-300 cursor-pointer`}
                                    onClick={() => router.push(`/grades/${course.id}`)}
                                >
                                    <td id="classTableCellDB">{course.period}</td>
                                    <td id="classTableCellDB">{course.room}</td>
                                    <td id="classTableCellDB">{course.name}</td>
                                    <td id="classTableCellDB">{nameToString(course.teacher?.lastName ?? '', course.teacher?.firstName ?? '')}</td>
                                    <td id="classTableCellDB">{course.finalGrade} ({finalLetterGrade})</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}