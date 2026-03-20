import { verifySession } from "@/app/lib/session";
import ErrorPage from "./_components/ErrorPage/ErrorPage";
import Landing from "./_components/Landing/Landing";
import TeacherDashboard from "./_components/Dashboard/TeacherDashboard/TeacherDashboard";
import { getSession, getUserById } from "./_actions/user-actions";
import { getTeacherDashboardData } from "./_actions/teacher-actions";
import { getStudentDashboardData } from "./_actions/student-actions";
import StudentDashboard from "./_components/Dashboard/StudentDashboard/StudentDashboard";


export default async function HomePage() {
  const user = await getSession();
  if (user instanceof Error) {
    if (user.message === 'No session found') {
      return <Landing />
    } else {
      return <ErrorPage />
    }
  }
  if (user.userRole === 'teacher') {
    const teacherDashboardData = await getTeacherDashboardData(user.userId as string);

    if (teacherDashboardData instanceof Error) return <ErrorPage />

    return <TeacherDashboard teacherDashboardData={teacherDashboardData} />

  } else if (user.userRole === 'student') {
    const studentDashboardData = await getStudentDashboardData(user);

    if (studentDashboardData instanceof Error) return <ErrorPage />

    return <StudentDashboard studentDashboardData={studentDashboardData} />
  }
}
