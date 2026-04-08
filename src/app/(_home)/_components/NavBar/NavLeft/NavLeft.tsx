import Link from "next/link";
import { User } from "@/app/lib/definitions";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import '../NavBar.css';

export default function NavLeft(user: User) {
    return (
        <div id='leftSideConNB' className='flex items-center justify-start gap-4'>
            <NavLogo />
            <NavLinks />
        </div>
    )
}