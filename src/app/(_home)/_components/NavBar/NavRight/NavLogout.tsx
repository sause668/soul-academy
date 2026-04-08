import { logoutUser } from "@/app/(_home)/_actions/user-actions";
import { useRouter } from "next/navigation";

export default function NavLogout({setError}: {setError: (error: Error) => void}) {
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
        <button id='logoutBtnNB' className='btn' onClick={handleLogout}>Logout</button>
    )
}