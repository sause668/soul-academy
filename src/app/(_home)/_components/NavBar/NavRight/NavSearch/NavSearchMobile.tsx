import { IoSearch } from "react-icons/io5";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import NavSearch from "./NavSearch";
import { User } from "@/app/lib/definitions";

export default function NavSearchMobile({ user }: { user: User }) {
    return (
        <div id="navSearchMobileCon" className="">
            <OpenModalButton 
                buttonText={<IoSearch className="h-5 w-5 text-screenWhite hover:text-hoverNavLink transition-colors duration-300" />} 
                modalComponent={<div className="fixed top-2 right-4 "><NavSearch user={user} /></div>} 
                cssClasses=""
            />
        </div>  
    )
}