import { verifySession } from "@/app/lib/session";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import Landing from "@/app/(_home)/_components/Landing/Landing";
import TeacherDashboard from "@/app/(_home)/_components/Dashboard/TeacherDashboard/TeacherDashboard";
import { getSession, getUserById } from "@/app/(_home)/_actions/user-actions";
import { getTeacherDashboardData } from "./_actions/teacher-actions";


export default async function HomePage() {
  const user = await getSession();
  if (user instanceof Error) {
    if (user.message === 'No session found') {
      return <Landing />
    } else {
      return <ErrorPage />
    }
  }
  const teacherDashboardData = await getTeacherDashboardData(user.userId as string);

  if (teacherDashboardData instanceof Error) return <ErrorPage />

  return <TeacherDashboard teacherDashboardData={teacherDashboardData} />
}
