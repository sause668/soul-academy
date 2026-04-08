import { usePathname, useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import '../NavBar.css';

export default function NavLogo() {
    const location = usePathname();
    const currentPath = location;
    const router = useRouter();


    return (
        <div id="navLogoConNB" className="flex items-center justify-start gap-2">
            {currentPath !== '/' && (
                // <button type="button" className="btn p-1 rounded-full" onClick={() => router.back()}>
                <IoChevronBack id="backButtonIcon" className="text-screenWhite cursor-pointer hover:text-hoverNavLink transition-colors duration-300" onClick={() => router.back()} />
                // </button>
            )}
            <Link href='/' className='font-title text-xl md:text-3xl lg:text-3xl font-bold text-screenWhite '>Soul Academy</Link>
        </div>
    )
}