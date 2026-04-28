import { getUser } from "@/app/(_home)/_actions/user-actions";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import NavBar from "@/app/(_home)/_components/NavBar/NavBar";

export default async function NavBarShell() {
    const user = await getUser();
    if (user instanceof Error) {
        if (user.message === 'No session found') return 
        else return <ErrorPage />
    } else return <NavBar user={user} />
}