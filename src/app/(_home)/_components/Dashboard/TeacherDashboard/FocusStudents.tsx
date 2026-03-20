import { PriorityStudent } from "@/app/lib/definitions";
import { FiUser } from "react-icons/fi";
import { convertBehaviorPriorityGradeColor } from "@/app/lib/grading";
import { nameToString } from "@/app/lib/typeConvertion";
import { useRouter } from "next/navigation";
import "@/app/(_home)/_components/Dashboard/Dashboard.css";

export default function FocusStudents({ focusStudents }: { focusStudents: PriorityStudent[] }) {
    const router = useRouter();

    return (
        <div id="focusStudentsConDB" className="whiteBox w-full overflow-hidden">
              <h2 id="focusStudentsTitleDB" className="text-xl text-center font-bold bg-blue-500 text-white p-2 rounded-t-lg">Focus Students</h2>
              <div id="focusStudentsListDB" className="flex flex-col justify-flex-start items-flex-start">
                {focusStudents.map((student, index) => (
                  <div 
                  className={`focusStudentsItemDB flex justify-between items-center gap-2 px-2 py-1.5 ${convertBehaviorPriorityGradeColor(student.priority)} hover:opacity-80 transition-opacity duration-300 cursor-pointer`} 
                  key={`focusStudentsItemT${index}`}
                  onClick={()=>router.push(`/students/${student.id}`)}
                  >
                    <div className="focusStudentsInfoConDB flex flex-row justify-flex-start items-flex-start gap-4">
                      <FiUser className="focusStudentsPicDB text-2xl bg-white rounded-full"/>
                      <h3 className="focusStudentsNameDB text-sm">{nameToString(student.firstName, student.lastName)}</h3>
                    </div>
                    {/* <h4 className="focusStudentsGradeDB text-sm">{student.grade}</h4> */}
                    <h3 className="focusStudentsPNDB text-sm">Priority: {student.priority}</h3>
                  </div>
                ))}
              </div>
            </div>
    );
}