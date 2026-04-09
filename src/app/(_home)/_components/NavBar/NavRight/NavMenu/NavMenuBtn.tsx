import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { User } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import NavMenu from "./NavMenu";
import '../../NavBar.css';
import { logoutUser } from "@/app/(_home)/_actions/user-actions";

export default function NavMenuBtn({ user, mediaQuery }: { user: User, mediaQuery: boolean }) {
    const router = useRouter();
    const [error, setError] = useState<Error | null>(null);

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result instanceof Error) {
            setError(result);
        } else {
            router.push('/');
        }
    }

    return mediaQuery ? (
        <OpenModalButton
            buttonText={<IoMenu className="size-6 text-3xl font-bold text-screenWhite hover:text-hoverNavLink transition-colors duration-300" />}
            modalComponent={<NavMenu user={user} handleLogout={handleLogout} />}
        />
    ) : (
        <button id='logoutBtnNB' className='btn' onClick={handleLogout}>Logout</button>
    )
}