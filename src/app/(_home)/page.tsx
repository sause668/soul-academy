import { verifySession } from "@/app/lib/session";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import Landing from "@/app/(_home)/_components/Landing/Landing";
import Dashboard from "@/app/(_home)/_components/Dashboard/Dashboard";


export default async function HomePage() {
  const user = await verifySession();
  if (user instanceof Error) {
    if (user.message === 'No session found') {
      return <Landing />
    } else {
      return <ErrorPage />
    }
  }
  return <Dashboard />
}
