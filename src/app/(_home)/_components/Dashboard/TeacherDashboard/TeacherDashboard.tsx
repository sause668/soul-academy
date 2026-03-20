'use client'

import Profile from "./Profile";
import Appointments from "./Appointments";
import HighlightedStudents from "./HighlightedStudents";
import FocusStudents from "./FocusStudents";
import Courses from "./Courses";
import Announcements from "./Announcements";
import { getPriorityStudents } from "@/app/lib/grading";
import { TeacherDashboardData } from "@/app/lib/definitions";
import "@/app/(_home)/_components/Dashboard/Dashboard.css";


export default function TeacherDashboard({ teacherDashboardData }: { teacherDashboardData: TeacherDashboardData }) {
    const { teacher, appointments, behaviors, courses, announcements } = teacherDashboardData;
    const { highlightStudents, focusStudents } = getPriorityStudents(behaviors ?? []);

    return (
        <div id="dashboardConCon" className="flex justify-center py-5">
            <div id="dashboardCon" className=" flex justify-center gap-4 w-[70%] ">
                <div id='profileSideDB' className="w-[30%] flex flex-col justify-flex-start items-center gap-2">
                    {teacher && <Profile teacher={teacher} />}
                    {appointments && <Appointments appointments={appointments} />}
                    <HighlightedStudents highlightStudents={highlightStudents} />
                    <FocusStudents focusStudents={focusStudents} />
                </div>
                <div id="contentSideDB" className="w-[70%] flex flex-col justify-flex-start items-flex-start gap-2 height-full">
                    {courses && <Courses courses={courses} />}
                    {announcements && teacher?.userId && <Announcements announcements={announcements} userId={teacher.userId} />}
                </div>
            </div>
        </div>
    );
}

