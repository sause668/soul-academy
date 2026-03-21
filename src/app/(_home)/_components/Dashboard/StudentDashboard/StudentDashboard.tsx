'use client'
import { StudentDashboardData } from "@/app/lib/definitions";
import Profile from "./Profile";
import Behaviors from "./Behaviors";
import Appointments from "./Appointments";
import Courses from "./Courses";
import Announcements from "./Announcements";

export default function StudentDashboard({ studentDashboardData }: { studentDashboardData: StudentDashboardData }) {
    const { student, appointments, behaviors, courses, announcements } = studentDashboardData;

    return (
        <div id="dashboardConCon" className="flex justify-center py-5 bg-zinc-100">
            <div id="dashboardCon" className=" flex justify-center gap-4 w-[70%] ">
                <div id='profileSideDB' className="w-[30%] flex flex-col justify-flex-start items-center gap-2">
                    <Profile student={student} />
                    <Behaviors behaviors={behaviors} />
                    <Appointments appointments={appointments} />
                </div>
                <div id="contentSideDB" className="w-[70%] flex flex-col justify-flex-start items-flex-start gap-2 height-full">
                    <Courses courses={courses} />
                    <Announcements announcements={announcements} />
                </div>
            </div>
        </div>
    )
}