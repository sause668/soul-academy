import { verifySession } from "@/app/lib/session";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import Landing from "@/app/(_home)/_components/Landing/Landing";
import Dashboard from "@/app/(_home)/_components/Dashboard/Dashboard";
import { getUserById } from "@/app/(_home)/_actions/user-actions";


export default async function HomePage() {
  const user = await verifySession();
  if (user instanceof Error) {
    if (user.message === 'No session found') {
      return <Landing />
    } else {
      return <ErrorPage />
    }
  }
  const userData = await getUserById(user.userId as string);
  return <Dashboard />
}
