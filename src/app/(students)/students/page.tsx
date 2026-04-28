import { redirect } from "next/navigation";
import { getSession } from "@/app/(_home)/_actions/user-actions";
import { getStudentsData } from "@/app/(students)/_actions/student-actions";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import Landing from "@/app/(_home)/_components/Landing/Landing";
import StudentSearch from "../_components/StudentsSearch/StudentSearch";

export default async function StudentsSearchPage() {
    const session = await getSession();
    if (session instanceof Error) {
        if (session.message === 'No session found') return <Landing />
        else return <ErrorPage />
    }

    if (session.userRole === 'student') redirect(`/`);

    else {
        const studentsData = await getStudentsData();
        if (studentsData instanceof Error) return <ErrorPage />;
        return <StudentSearch studentsData={studentsData}/>
    }
}