import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import NavLogout from "./NavLogout";
import NavSearch from "./NavSearch/NavSearch";
import NavSearchMobile from "./NavSearch/NavSearchMobile";
import NavMenuMobile from "./NavMenuMobile";
import { User } from "@/app/lib/definitions";
import { logoutUser } from "@/app/(_home)/_actions/user-actions";
import { useIsClient } from "@/app/lib/utils";
import '../NavBar.css';

export default function NavRight({ user }: { user: User }) {
    const isClient = useIsClient();
    const MediaXS = useMediaQuery({ query: '(max-width: 560px)' });
    const router = useRouter();
    const [error, setError] = useState<Error | null>(null);

    

    if (!isClient) return null;
    return (
        <div id='rightSideConNB' className='flex items-center justify-end gap-2'>
            {/* <Link href='/profile'><button>Profile</button></Link> */}
            {!MediaXS ? <NavSearch user={user} /> : <NavSearchMobile user={user} />}
            {/* <p className='text-screenWhite text-lg font-bold font-body'>{user.username}</p> */}
            {!MediaXS ? <NavLogout setError={setError} /> : <NavMenuMobile user={user} setError={setError} />}
            {error && <p className="text-error text-sm font-body">{error.message}</p>}
        </div>
    )
}