import { IoMenu } from "react-icons/io5";
import { User } from "@/app/lib/definitions";
import { useNavMenu } from "@/app/(_home)/_context/NavBarContext";
import '../../NavBar.css';

export default function NavMenuBtn({ user, mediaQuery }: { user: User, mediaQuery: boolean }) {
        const { OpenNavMenu, handleLogout } = useNavMenu();
    
    return mediaQuery ? (
        <IoMenu 
        className="size-6 text-3xl font-bold text-screenWhite cursor-pointer hover:text-hoverNavLink transition-colors duration-300" 
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => OpenNavMenu()}
        />
    ) : (
        <button id='logoutBtnNB' className='btn' onClick={handleLogout}>Logout</button>
    )
}