'use client';

import { useState } from "react";
import Header from "./Header";
import Options from "./Options";
import Grades from "./Grades";
import Behaviors from "./Behaviors";
import Groups from "./Groups";
import { CourseData, GradebookData, SessionPayload } from "@/app/lib/definitions";
import './Gradebook.css';

export default function Gradebook({ courseData, session }: { courseData: GradebookData, session: SessionPayload }) {
    const { course, assignments, students, behaviors, groups } = courseData;
    const [quarter, setQuarter] = useState(1)
    const [errors, setErrors] = useState({});

    return (
        <div className="flex justify-center items-center pt-5 pb-5">
            <div id="gradeBookCon" className="flex flex-col justify-start items-center gap-2 w-[95%]">
                <div id="headerConGB" className="flex justify-between items-center w-[75%]">
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