import { Course } from "@/app/lib/definitions";
import './CourseStudent.css';

export default function Header({ course }: { course: Course }) {
    return (
        <div id="titleConC" className="whiteBox p-3 flex flex-col justify-flex-start items-start gap-0.5">
            <h1 id="titleC" className="text-4xl font-bold">{course.grade}th Grade {course.name}</h1>
            <h4 id="periodConC" className="text-lg ">Period {course.period}: Room - {course.room}</h4>
            <h3 id="teacherConC" className="text-md text-zinc-500">{course.teacher?.lastName}, {course.teacher?.firstName}</h3>
        </div>
    )
}