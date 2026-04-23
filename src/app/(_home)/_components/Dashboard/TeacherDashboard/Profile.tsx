import { Teacher } from "@/app/lib/definitions";
import { FiUser } from "react-icons/fi";

export default function Profile({ teacher }: { teacher?: Teacher }) {
  return (
    <div id="profileConDB" className="whiteBox flex md:flex-col justify-center items-center gap-2 p-2">
      <div id="profilePicConDB ">
        <FiUser id='profilePicDB' className="text-[10rem] bg-white rounded-full" />
      </div>
      <div id="profileInfoConDB">
        <h3 className="profileInfoDB font-subtitle text-2xl font-bold">{teacher?.firstName} {teacher?.lastName}</h3>
        <h4 className="profileInfoDB font-subtitle text-lg">Teacher</h4>
        <h4 className="profileInfoDB font-body text-zinc-500">{teacher?.primaryGrade}th Grade {teacher?.primarySubject}</h4>
      </div>
    </div>
  );
}