'use client'

import { useState } from "react";
import { CourseData } from "@/app/lib/definitions";
import Header from "./Header";
import Options from "./Options";
import Grades from "./Grades";
import Behaviors from "./Behaviors";
import Assignments from "./Assignments";
import Groups from "./Groups";
import './Course.css';


export default function Course({ courseData }: { courseData: CourseData }) {
    const { course, students, assignments, behaviors, groups, announcements } = courseData;
    const [quarter, setQuarter] = useState(1);
    // const [errors, setErrors] = useState({});



    return (
        <div className="flex justify-center items-center pt-5 pb-5">
            <div id="classConC" className="flex max-md:flex-col max-md:justify-start md:justify-center max-md:items-center md:items-flex-start max-md:gap-2 md:gap-0 w-[95%] md:w-[95%] lg:w-[85%] xl:w-[75%] 2xl:w-[70%]">
                <div id="headerConC" className="flex flex-col justify-flex-start items-center w-[95%] md:w-[40%] gap-2">
                    <Header course={course} />
                    <Options quarter={quarter} setQuarter={setQuarter} course={course} />
                    <Grades students={students} assignments={assignments} quarter={quarter} />
                    <Behaviors students={students} behaviors={behaviors} />
                </div>
                <div id="classInfoConC" className="flex flex-col justify-flex-start items-center w-[95%] md:w-[60%] gap-2">
                    <Assignments assignments={assignments} students={students} quarter={quarter} />
                    <Groups groups={groups} students={students} courseId={course.id ?? 0} isTeacher={course.isTeacher ?? false} />
                    {/* <Announcements /> */}
                </div>
            </div>
        </div>
    )
}