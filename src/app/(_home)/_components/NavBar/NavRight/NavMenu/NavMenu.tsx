import { User } from "@/app/lib/definitions";
import { navLinks } from "@/app/lib/site-data";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/(_home)/_context/Modal";

export default function NavMenu({ user, handleLogout }: { user: User, handleLogout: () => void }) {
    const { closeModal } = useModal();
    const router = useRouter();
    return (
        <div
            className={"whiteBox fixed top-10 right-1 flex flex-col justify-center items-center mt-0.5 text-black text-lg overflow-hidden"}
        >
            {navLinks.map((link) => (
                <div
                    className="p-2 w-full border-b border-gray-300 text-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300"
                    key={link.href}
                    onClick={() => {
                        router.push(link.href);
                        closeModal();
                    }}
                >
                    <h3 className="navMenuLink" >{link.text}</h3>
                </div>
            ))}
            <div
                className="p-2 w-full text-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300"
                onClick={() => {
                    handleLogout();
                    closeModal();
                }}
            >
                <h3 className="navMenuLink" >Logout</h3>
            </div>
        </div>
    )
}