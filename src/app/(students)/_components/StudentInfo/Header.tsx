import { Student } from "@/app/lib/definitions";
import { FiUser } from "react-icons/fi";
import './StudentInfo.css';
import { useRouter } from "next/navigation";

export default function Header({ student }: { student: Student }) {
    const router = useRouter();
    return (
        <div id="profileConSP" className="whiteBox max-md:flex max-md:justify-center max-md:items-center p-2">
            <div id="profilePicConSP">
                <FiUser id='profilePicSP' className="text-[10rem] bg-white rounded-full" />
            </div>
            <div id="profileInfoConSP">
                <h2 className="profileInfoSP font-subtitle text-2xl font-bold">{student.firstName} {student.lastName}</h2>
                <h4 className="profileInfoSP font-subtitle text-lg">Student</h4>
                <h4 className="profileInfoSP text-zinc-500">Grade: {student.currentGrade}th</h4>
                {student.siblings && (<>
                    <h3 className="text-md pt-2 font-bold">Siblings:</h3>
                    {student.siblings.filter(sibling => sibling.id !== student.id).map((sibling, index) => (
                        <h3
                            onClick={() => router.push(`/students/${sibling.id}`)}
                            key={`sibling${index}`}
                            className="text-md font-bold border-2 border-zinc-300 rounded-lg p-1 text-center cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300"
                        >{sibling.firstName} {sibling.lastName}</h3>
                    ))}
                </>)}
            </div>
        </div>
    )
}