import { getSession } from "@/app/(_home)/_actions/user-actions";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import Landing from "@/app/(_home)/_components/Landing/Landing";
import { getCourseData, getCourseStudentData } from "../../_actions/course-actions";
import Course from "../../_components/Course/Course";
import CourseStudent from "../../_components/CourseStudent/CourseStudent";



export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const session = await getSession();
    if (session instanceof Error) {
        if (session.message === 'No session found') return <Landing />
        else return <ErrorPage />
    }
    if (session.userRole === 'student') {
        const courseStudentData = await getCourseStudentData(courseId, session);
        if (courseStudentData instanceof Error) return <ErrorPage />
        return <CourseStudent courseStudentData={courseStudentData} />
    } else {
        const courseData = await getCourseData(courseId, session);
        if (courseData instanceof Error) return <ErrorPage />
        return <Course courseData={courseData}/>
    }
}