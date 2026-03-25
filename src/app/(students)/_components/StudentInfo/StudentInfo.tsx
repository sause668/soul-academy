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

    // const handleNavStudent = (studentId) => {
    //     navigate(`/students/${studentId}`);
    //     navigate(0);
    // }

    // const handleGrades = (classId) => {
    //     navigate(`/students/${studentId}/classes/${classId}`)
    // }

    return (
        <div className="flex justify-center items-center pt-5 pb-5">
            <div id="studentPageConSP " className="flex justify-center items-flex-start w-[70%] gap-2">
                <div id='profileSideSP' className="flex flex-col justify-flex-start items-center w-[30%] gap-2">
                    <Header student={student} />
                    <Options quarter={quarter} setQuarter={setQuarter} />
                    <Behaviors behaviors={behaviors} />
                </div>
                <div id="classesSideSP" className="flex flex-col justify-flex-start items-center w-[70%] gap-2">
                    <Courses courses={courses} quarter={quarter} />
                </div>
            </div>
        </div>
    );
}
