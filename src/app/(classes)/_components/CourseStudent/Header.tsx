import { Course } from "@/app/lib/definitions";
import './CourseStudent.css';

export default function Header({ course }: { course: Course }) {
    return (
        <div id="titleConC" className="whiteBox p-3 flex flex-col justify-flex-start md:items-start items-center gap-0.5 md:max-w-[70%]">
            <h1 id="titleC" className="font-subtitle text-4xl font-bold">{course.grade}th Grade {course.name}</h1>
            <h4 id="periodConC" className="font-subtitle text-lg ">Period {course.period}: Room - {course.room}</h4>
            <h3 id="teacherConC" className="font-body text-md text-zinc-500">{course.teacher?.lastName}, {course.teacher?.firstName}</h3>
        </div>
    )
}