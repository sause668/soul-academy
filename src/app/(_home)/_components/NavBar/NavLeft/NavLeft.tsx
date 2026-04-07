import Link from "next/link";
import { User } from "@/app/lib/definitions";
import '../NavBar.css';
import Links from "./Links";

export default function NavLeft(user: User) {
    return (
        <div id='leftSideConNB' className='flex items-center justify-start gap-6'>
            {/* <h1 className='text-screenWhite text-2xl font-bold font-body'>Soul Academy</h1> */}
            <Link href='/' className='font-title text-5xl max-xs:text-xl font-bold text-screenWhite '>Soul Academy</Link>
            <Links />
        </div>
    )
}