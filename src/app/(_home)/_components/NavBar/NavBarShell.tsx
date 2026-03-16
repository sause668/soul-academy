import { getUser } from "@/app/(_home)/_actions/user-actions";
import "./NavBar.css";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import NavBar from "@/app/(_home)/_components/NavBar/NavBar";

export default async function NavBarShell() {
    const user = await getUser();

    if (user instanceof Error && user.message !== 'No session found') return <ErrorPage />

    return <NavBar user={user} />
}