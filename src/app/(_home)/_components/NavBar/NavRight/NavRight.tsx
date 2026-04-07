import { useState } from "react";
import { User } from "@/app/lib/definitions";
import { logoutUser } from "@/app/(_home)/_actions/user-actions";
import { useRouter } from "next/navigation";
import Search from "./Search";
import '../NavBar.css';

export default function NavRight({ user }: { user: User }) {
    const router = useRouter();
    const [error, setError] = useState<Error | null>(null);

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result instanceof Error) {
            setError(result);
        } else {
            router.push('/');
        }
    }

    return (
        <div id='rightSideConNB' className='flex items-center justify-end gap-2'>
            {/* <Link href='/profile'><button>Profile</button></Link> */}
            <Search user={user} />
            {/* <p className='text-screenWhite text-lg font-bold font-body'>{user.username}</p> */}
            <button id='logoutBtnNB' className='btn' onClick={handleLogout}>Logout</button>
            {error && <p className="text-error text-sm font-body">{error.message}</p>}
        </div>
    )
}