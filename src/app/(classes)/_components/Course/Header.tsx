import { Course } from "@/app/lib/definitions";
import './Course.css';

export default function Header({ course }: { course: Course }) {
    return (
        <div id="titleConC" className="whiteBox p-3 flex flex-col justify-flex-start items-start gap-0.5">
            <h1 id="titleC" className="text-4xl font-bold">{course.grade}th Grade {course.name}</h1>
            <h4 id="teacherNameC" className="text-lg ">Period {course.period}: Room - {course.room}</h4>
            <h3 id="periodC" className="text-md text-zinc-500">{course.teacher?.lastName}, {course.teacher?.firstName}</h3>
            {/* <h4 id="classInfoC" className="text-md">{class_.students.length} Students</h4> */}
        </div>
    )
}