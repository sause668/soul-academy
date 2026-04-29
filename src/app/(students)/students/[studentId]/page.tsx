import { notFound, redirect } from "next/navigation";
import { getSession } from "@/app/(_home)/_actions/user-actions";
import { getStudentPageData } from "@/app/(students)/_actions/student-actions";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import Landing from "@/app/(_home)/_components/Landing/Landing";
import StudentInfo from "../../_components/StudentInfo/StudentInfo";

export default async function StudentPage({ params }: { params: Promise<{ studentId: string }> }) {
    const { studentId } = await params;
    const session = await getSession();
    if (session instanceof Error) {
        if (session.message === 'No session found') return <Landing />
        else return <ErrorPage />
    }

    if (session.userRole === 'student') redirect(`/`);
    else {
        const studentData = await getStudentPageData(studentId);
        if (studentData instanceof Error) return <ErrorPage />;
        if (!studentData) return notFound();
        return <StudentInfo studentData={studentData}/>
    }
}