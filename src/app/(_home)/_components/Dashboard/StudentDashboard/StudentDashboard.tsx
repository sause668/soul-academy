'use client'

import Profile from "./Profile";
import Behaviors from "./Behaviors";
import Appointments from "./Appointments";
import Courses from "./Courses";
import Announcements from "./Announcements";
import { StudentDashboardData } from "@/app/lib/definitions";

export default function StudentDashboard({ studentDashboardData }: { studentDashboardData: StudentDashboardData }) {
    const { student, appointments, behaviors, courses, announcements } = studentDashboardData;

    return (
        <div id="dashboardConCon" className="flex justify-center py-5 bg-zinc-100">
            <div id="dashboardCon" className="flex max-md:flex-col justify-center max-md:items-center gap-4 w-[95%] sm:w-[90%] md:w-[95%] lg:w-[95%] xl:w-[85%] 2xl:w-[70%]">
                <div id='profileSideDB' className="w-full md:w-[30%] flex flex-col justify-flex-start items-center gap-2">
                    <Profile student={student} />
                    <Appointments appointments={appointments} />
                    <Behaviors behaviors={behaviors} />
                </div>
                <div id="contentSideDB" className="md:w-[70%] flex flex-col justify-flex-start items-flex-start gap-2 height-full">
                    <Courses courses={courses} />
                    <Announcements announcements={announcements} />
                </div>
            </div>
        </div>
    )
}