import { IoSearch } from "react-icons/io5";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import NavSearch from "./NavSearch";
import { User } from "@/app/lib/definitions";

export default function NavSearchBtn({ user, mediaXS }: { user: User, mediaXS: boolean }) {
    return mediaXS ? (
        <OpenModalButton
            buttonText={<IoSearch className="size-6 text-3xl text-screenWhite hover:text-hoverNavLink transition-colors duration-300" />}
            modalComponent={<div className="fixed top-2 right-4 "><NavSearch user={user} /></div>}
            cssClasses=""
        />
    ) : (
        <NavSearch user={user} />
    )
}