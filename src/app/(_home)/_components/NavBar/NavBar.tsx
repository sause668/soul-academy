"use client";

import Link from "next/link";
import { User } from "@/app/lib/definitions";
import { logoutUser } from "../../_actions/user-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import './NavBar.css';

export default function NavBar({ user }: { user: User | Error }) {

    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();
    const handleLogout = async () => {
        const result = await logoutUser();
        if (result instanceof Error) {
            setError(result);
        } else {
            router.push('/');
        }
    }

    return (
        <div id='mainConNB' className='flex items-center justify-between bg-primary p-4 z-50 shadow-sm '>
            <div id='leftSideConNB' className='flex items-center justify-start gap-2'>
                <Link href='/' className='text-screenWhite'>Logo</Link>
            </div>
            <div id='rightSideConNB' className='flex items-center justify-end gap-2'>
                {user instanceof Error ? (
                    <>
                        <Link id='signupLinkNB' href='/signup'>
                            <button id='signupBtnNB' className='btn'>Signup</button>
                        </Link>
                        <Link id='loginLinkNB' href='/login'>
                            <button id='loginBtnNB' className='btn'>Login</button>
                        </Link>
                    </>
                ) : (
                    <>
                        {/* <Link href='/profile'><button>Profile</button></Link> */}
                        <p className='text-screenWhite text-lg font-bold font-body'>{user.username}</p>
                        <button id='logoutBtnNB' className='btn' onClick={handleLogout}>Logout</button>
                        {error && <p className="text-error text-sm font-body">{error.message}</p>}
                    </>
                )}
            </div>
        </div>
    )
}