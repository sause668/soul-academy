import { Student } from "@/app/lib/definitions";
import { FiUser } from "react-icons/fi";

export default function Profile({ student }: { student: Student }) {
    return (
        <div id="profileConDB" className="whiteBox p-2">
            <div id="profilePicConDB ">
                <FiUser id='profilePicDB' className="text-[10rem] bg-white rounded-full" />
            </div>
            <div id="profileInfoConDB">
                <h3 className="profileInfoDB text-2xl font-bold">{student.firstName} {student.lastName}</h3>
                <h4 className="profileInfoDB text-lg">Student</h4>
                <h4 className="profileInfoDB text-zinc-500">{student.currentGrade}th Grade</h4>

            </div>
        </div>
    )
}