import { Course } from "@/app/lib/definitions";
import './Gradebook.css';

export default function Header({ course }: { course: Course }) {
    return (
        <div id="titleConGB" className="whiteBox p-3 flex flex-col justify-flex-start items-start gap-0.5">
            <h1 id="titleGB" className="text-4xl font-bold">{course.grade}th Grade {course.name}</h1>
            <h3 id="teacherNameGB" className="text-lg">{course.teacher?.lastName}, {course.teacher?.firstName}</h3>
            <h3 id="classRoomGB" className="text-md text-zinc-500">Period {course.period}: Room - {course.room}</h3>
        </div>
    )
}