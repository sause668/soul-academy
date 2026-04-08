"use client";

import Link from "next/link";
import { User } from "@/app/lib/definitions";
import { logoutUser } from "../../_actions/user-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavLeft from "./NavLeft/NavLeft";
import NavRight from "./NavRight/NavRight";
import './NavBar.css';

export default function NavBar({ user }: { user: User }) {
    const router = useRouter();
  

    return (
        <div id='mainConNB' className='flex items-center justify-between bg-primary p-3 z-50 shadow-sm'>
            <NavLeft />
            <NavRight user={user} />
        </div>
    )
}