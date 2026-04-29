'use client'

import { useState } from "react";
import Header from "./Header";
import Options from "./Options";
import StudentBehavior from "./Behavior";
import Group from "./Group";
import Assignments from "./Assignments";
import { CourseStudentData } from "@/app/lib/definitions";

export default function CourseStudent({ courseStudentData }: { courseStudentData: CourseStudentData }) {
    const { course, assignments, behavior, group } = courseStudentData;
    const [quarter, setQuarter] = useState(1)

    return (
        <div className="flex justify-center items-center pt-5 pb-5">
            <div id="classConC" className="flex max-md:flex-col max-md:justify-start md:justify-center max-md:items-center md:items-flex-start max-md:gap-2 md:gap-0 w-[95%] md:w-[95%] lg:w-[85%] xl:w-[75%] 2xl:w-[70%]">
                <div id="headerConC" className="flex flex-col justify-flex-start items-center w-[95%] md:w-[40%] gap-2">
                    <Header course={course} />
                    <Options quarter={quarter} setQuarter={setQuarter} />
                    <StudentBehavior behavior={behavior} />
                    <Group group={group} />
                </div>
                <div id="classInfoConC" className="flex flex-col justify-flex-start items-center w-[95%] md:w-[60%] gap-2">
                    <Assignments assignments={assignments} quarter={quarter} />
                </div>
            </div>
        </div>
    );
}