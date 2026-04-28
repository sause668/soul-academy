import { usePathname, useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";

export default function NavLogo() {
    const location = usePathname();
    const currentPath = location;
    const router = useRouter();

    return (
        <div id="navLogoConNB" className="flex items-center justify-start gap-2">
            {currentPath !== '/' && (<IoChevronBack id="backButtonIcon" className="text-screenWhite cursor-pointer hover:text-hoverNavLink transition-colors duration-300" onClick={() => router.back()} />)}
            <Link href='/' className='font-title text-3xl lg:text-4xl font-bold text-screenWhite '>Soul Academy</Link>
        </div>
    )
}