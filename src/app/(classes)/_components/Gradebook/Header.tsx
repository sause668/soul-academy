import { Course } from "@/app/lib/definitions";
import './Gradebook.css';

export default function Header({ course }: { course: Course }) {
    return (
        <div id="titleConGB" className="whiteBox p-3 flex flex-col justify-start items-start max-md:items-center gap-0.5">
            <h1 id="titleGB" className="font-title text-4xl font-bold">{course.grade}th Grade {course.name}</h1>
            <h3 id="teacherNameGB" className="font-subtitle text-lg">{course.teacher?.lastName}, {course.teacher?.firstName}</h3>
            <h3 id="classRoomGB" className="font-body text-md text-zinc-500">Period {course.period}: Room - {course.room}</h3>
        </div>
    )
}