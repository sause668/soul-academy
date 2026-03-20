import { Teacher } from "@/app/lib/definitions";
import { FiUser } from "react-icons/fi";

export default function Profile({ teacher }: { teacher: Teacher }) {
    return (
        <div id="profileConDB"className="whiteBox p-2">
              <div id="profilePicConDB ">
                <FiUser id='profilePicDB' className="text-[10rem] bg-white rounded-full"/>
              </div>
              <div id="profileInfoConDB">
                <h3 className="profileInfoDB text-2xl font-bold">{teacher.firstName} {teacher.lastName}</h3>
                <h4 className="profileInfoDB text-lg">Teacher</h4>
                <h4 className="profileInfoDB text-zinc-500">{teacher.primaryGrade}th Grade {teacher.primarySubject}</h4>
                
              </div>
            </div>
    );
}