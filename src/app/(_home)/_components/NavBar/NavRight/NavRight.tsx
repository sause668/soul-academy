import { useMediaQuery } from "react-responsive";
import NavSearchBtn from "./NavSearch/NavSearchBtn";
import NavMenuBtn from "./NavMenu/NavMenuBtn";
import { useIsClient } from "@/app/lib/utils";
import { User } from "@/app/lib/definitions";

export default function NavRight({ user }: { user: User }) {
    const isClient = useIsClient();
    const MediaMD = useMediaQuery({ query: '(max-width: 48rem)' });

    if (!isClient) return null;
    
    return (
        <div id='rightSideConNB' className='flex items-center justify-end gap-4'>
            <NavSearchBtn user={user} mediaQuery={MediaMD} />
            <NavMenuBtn user={user} mediaQuery={MediaMD} />
        </div>
    )
}