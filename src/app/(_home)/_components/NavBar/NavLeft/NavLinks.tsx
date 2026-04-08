import Link from "next/link";
import '../NavBar.css';

export default function NavLinks() {
    const links = [
        {
            href: '/students',
            text: 'Students'
        },
    ]
    return (
        <div id='linksConNB' className='flex items-center justify-start gap-2 max-2xs:hidden'>
            {links.map((link) => (
                <Link 
                className='navLink'
                href={link.href} 
                key={`navLink${link.href}`}
                >{link.text}</Link>
            ))}
        </div>
    )
}