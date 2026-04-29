"use client";

import { NavMenuProvider } from "@/app/(_home)/_context/NavBarContext";
import NavLeft from "./NavLeft/NavLeft";
import NavRight from "./NavRight/NavRight";
import { User } from "@/app/lib/definitions";

export default function NavBar({ user }: { user: User }) {
  return (
    <div className="relative">
        <NavMenuProvider user={user}>
      <div
        id="mainConNB"
        className="flex items-center justify-between bg-primary p-3 z-50 shadow-sm"
      >
        <NavLeft />
        <NavRight user={user} />
      </div>
      </NavMenuProvider>
    </div>
  );
}
