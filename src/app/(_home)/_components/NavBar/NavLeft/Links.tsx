import Link from "next/link";
import '../NavBar.css';

export default function Links() {
    const links = [
        {
            href: '/students',
            text: 'Students'
        },
    ]
    return (
        <div id='linksConNB' className='flex items-center justify-start gap-2'>
            {links.map((link) => (
                <Link 
                className='btn text-md'
                href={link.href} 
                key={`navLink${link.href}`}
                >{link.text}</Link>
            ))}
        </div>
    )
}