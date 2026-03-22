'use client'

import { useState } from "react";
import { CourseStudentData } from "@/app/lib/definitions";
import Header from "./Header";
import Options from "./Options";
import Behavior from "./Behavior";
import Group from "./Group";
import Assignments from "./Assignments";
import './CourseStudent.css';

export default function CourseStudent({ courseStudentData }: { courseStudentData: CourseStudentData }) {
    const { course, assignments, behavior, group, announcements } = courseStudentData;

    const [quarter, setQuarter] = useState(1)
    const [errors, setErrors] = useState({});



    return (
        <div className="flex justify-center items-center pt-5 pb-5">
            <div id="classConC" className="flex justify-center items-flex-start w-[70%]">
                <div id="headerConC" className="flex flex-col justify-flex-start items-center w-[40%] gap-2">
                    <Header course={course} />
                    <Options quarter={quarter} setQuarter={setQuarter} />
                    <Behavior behavior={behavior} />
                    <Group group={group} />
                </div>
                <div id="classInfoConC" className="flex flex-col justify-flex-start items-center w-[60%] gap-2">
                    <Assignments assignments={assignments} quarter={quarter} />
                </div>
            </div>
        </div>
    );
}