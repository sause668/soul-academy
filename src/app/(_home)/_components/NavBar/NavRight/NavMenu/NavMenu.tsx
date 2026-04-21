import { User } from "@/app/lib/definitions";
import { navLinks } from "@/app/lib/site-data";
import { useRouter } from "next/navigation";
import { useNavMenu } from "@/app/(_home)/_context/NavBarContext";
import { useEffect, useRef } from "react";

export default function NavMenu({ user, handleLogout }: { user: User, handleLogout: () => void }) {
    const { closeNavMenu } = useNavMenu();
    const router = useRouter();
    const navMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handlePointerDownOutside = (e: MouseEvent | PointerEvent) => {
            const target = e.target as Node | null;
            if (
                target &&
                navMenuRef.current &&
                !navMenuRef.current.contains(target)
            ) {
                closeNavMenu();
            }
        };

        document.addEventListener("pointerdown", handlePointerDownOutside);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDownOutside);
        };
    }, [closeNavMenu]);


    return (
        <div
            ref={navMenuRef}
            className={"whiteBox absolute top-full right-1 flex flex-col justify-center items-center mt-0.5 text-black text-lg overflow-hidden min-w-48"}
        >
            {navLinks.map((link) => (
                <div
                    className="p-2 w-full border-b border-gray-300 text-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300"
                    key={link.href}
                    onClick={() => {
                        router.push(link.href);
                        closeNavMenu();
                    }}
                >
                    <h3 className="navMenuLink" >{link.text}</h3>
                </div>
            ))}
            <div
                className="p-2 w-full text-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300"
                onClick={() => {
                    handleLogout();
                    closeNavMenu();
                }}
            >
                <h3 className="navMenuLink" >Logout</h3>
            </div>
        </div>
    )
}