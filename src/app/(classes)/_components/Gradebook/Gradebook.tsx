'use client';

import { useState } from "react";
import Header from "./Header";
import Options from "./Options";
import Grades from "./Grades";
import Behaviors from "./Behaviors";
import Groups from "./Groups";
import { GradebookData, SessionPayload } from "@/app/lib/definitions";

export default function Gradebook({ courseData, session }: { courseData: GradebookData, session: SessionPayload }) {
    const { course, assignments, students, behaviors, groups } = courseData;
    const [quarter, setQuarter] = useState(1)

    return (
        <div className="flex justify-center items-center bg-zinc-100 pt-5 pb-5">
            <div id="gradeBookCon" className="flex flex-col justify-start items-center gap-2 w-[95%]">
                <div id="headerConGB" className="flex max-md:flex-col justify-between items-center gap-2 w-full md:w-[95%] lg:w-[90%] xl:w-[85%] 2xl:w-[75%]">
                    <Header course={course} />
                    <Options quarter={quarter} setQuarter={setQuarter} courseId={course.id ?? 0} />
                </div>
                <Grades assignments={assignments} students={students} quarter={quarter} courseId={course.id ?? 0} />
                <Behaviors behaviors={behaviors} students={students} courseId={course.id ?? 0} />
                <Groups groups={groups} students={students} courseId={course.id ?? 0} />
            </div>
        </div>
    );
}