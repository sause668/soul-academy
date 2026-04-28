import { redirect } from "next/navigation";
import { getSession } from "@/app/(_home)/_actions/user-actions";
import { getGradebookData } from "@/app/(classes)/_actions/course-actions";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import Landing from "@/app/(_home)/_components/Landing/Landing";
import Gradebook from "@/app/(classes)/_components/Gradebook/Gradebook";

export default async function GradebookPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const session = await getSession();
    if (session instanceof Error) {
        if (session.message === 'No session found') return <Landing />
        else return <ErrorPage />
    }
    if (session.userRole === 'student') {
        redirect(`/courses/${courseId}`);
    } else {
        const courseData = await getGradebookData(courseId, session);
        if (courseData instanceof Error) return <ErrorPage />
        return <Gradebook courseData={courseData} session={session}/>
    }
}