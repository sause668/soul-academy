'use client';
import { useState } from "react";
import Header from "./Header";
import Options from "./Options";
import Behaviors from "./Behaviors";
import Courses from "./Courses";
import { StudentData } from "@/app/lib/definitions";
import "./StudentInfo.css";

export default function StudentInfo({ studentData }: { studentData: StudentData }) {
    const { student, behaviors, courses } = studentData;
    const [quarter, setQuarter] = useState(1);

    return (
        <div className="flex justify-center items-center pt-5 pb-5">
            <div id="studentPageConSP " className="flex max-md:flex-col justify-center items-start max-md:items-center w-[95%] xs:w-[90%] sm:w-[85%] md:w-[95%] lg:w-[90%] xl:w-[85%] 2xl:w-[70%] gap-2">
                <div id='profileSideSP' className="flex flex-col justify-flex-start items-center w-[90%] md:w-[35%] gap-2">
                    <Header student={student} />
                    <Options quarter={quarter} setQuarter={setQuarter} />
                    <Behaviors behaviors={behaviors} />
                </div>
                <div id="classesSideSP" className="flex flex-col justify-flex-start items-center w-full md:w-[65%] gap-2">
                    <Courses courses={courses} quarter={quarter} />
                </div>
            </div>
        </div>
    );
}
