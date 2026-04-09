import Link from "next/link";
import { navLinks } from "@/app/lib/site-data";
import '../NavBar.css';

export default function NavLinks() {
    

    return (
        <div id='linksConNB' className='flex items-center justify-start gap-2 max-2xs:hidden'>
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