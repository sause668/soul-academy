import { IoMenu } from "react-icons/io5";
import { User } from "@/app/lib/definitions";
import { useNavMenu } from "@/app/(_home)/_context/NavBarContext";
import '../../NavBar.css';

export default function NavMenuBtn({ user, mediaQuery }: { user: User, mediaQuery: boolean }) {
    const { toggleNavMenu, handleLogout, navMenuBtnRef } = useNavMenu();

    const handleClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation();
        toggleNavMenu();
    }

    return mediaQuery ? (
        <div ref={navMenuBtnRef}>
            <IoMenu
                className="size-6 text-3xl font-bold text-screenWhite cursor-pointer hover:text-hoverNavLink transition-colors duration-300"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => handleClick(e)}
            />
        </div>
    ) : (
        <button id='logoutBtnNB' className='btn' onClick={handleLogout}>Logout</button>
    )
}