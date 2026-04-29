import Link from "next/link";
import { navLinks } from "@/app/lib/site-data";

export default function NavLinks() {
    

    return (
        <div id='linksConNB' className='flex items-center justify-start gap-4 max-md:hidden lg:ml-4'>
            {navLinks.map((link) => (
                <Link 
                className='navLink'
                href={link.href} 
                key={`navLink${link.href}`}
                >{link.text}</Link>
            ))}
        </div>
    )
}