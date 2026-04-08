import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { User } from "@/app/lib/definitions";

export default function NavMenuMobile({ user, setError }: { user: User, setError: (error: Error) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        // if (isOpen) {
        //     document.body.style.overflow = 'hidden';
        // } else {
        //     document.body.style.overflow = 'auto';
        // }
    }

    return (
        <div id="navMenuMobileConNB">
            <button id="navMenuMobileBtnNB">
                <IoMenu className="h-5 w-5 text-screenWhite hover:text-hoverNavLink transition-colors duration-300" />
            </button>
        </div>
    )
}