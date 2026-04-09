import { useMediaQuery } from "react-responsive";
import NavSearchBtn from "./NavSearch/NavSearchBtn";
import NavMenuBtn from "./NavMenu/NavMenuBtn";
import { User } from "@/app/lib/definitions";
import { useIsClient } from "@/app/lib/utils";
import '../NavBar.css';

export default function NavRight({ user }: { user: User }) {
    const isClient = useIsClient();
    const MediaXS = useMediaQuery({ query: '(max-width: 560px)' });

    if (!isClient) return null;
    
    return (
        <div id='rightSideConNB' className='flex items-center justify-end gap-4'>
            <NavSearchBtn user={user} mediaXS={MediaXS} />
            <NavMenuBtn user={user} mediaXS={MediaXS} />
        </div>
    )
}