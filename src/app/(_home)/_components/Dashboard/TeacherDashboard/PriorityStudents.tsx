'use client'
import { PriorityStudent } from "@/app/lib/definitions";
import { FiUser } from "react-icons/fi";
import { convertBehaviorPriorityGradeColor } from "@/app/lib/grading";
import { nameToString } from "@/app/lib/typeConvertion";
import { useRouter } from "next/navigation";
import "@/app/(_home)/_components/Dashboard/Dashboard.css";

export default function PriorityStudents({ priorityStudents }: { priorityStudents: { title: string, students: PriorityStudent[] } }) {
    const router = useRouter();

    return (
        <div id="highlightStudentsConDB" className="whiteBox w-full overflow-hidden">
              <h2 id="highlightStudentsTitleDB" className="text-xl text-center font-bold bg-blue-500 text-white font-subtitle p-2 rounded-t-lg">{priorityStudents?.title}</h2>
              <div id="highlightStudentsListDB" className="flex flex-col justify-flex-start items-flex-start">
                {priorityStudents?.students.map((student, index) => (
                  <div 
                    className={`highlightStudentsItemDB flex justify-between items-center gap-2 px-2 py-1.5 font-body ${convertBehaviorPriorityGradeColor(student.priority)} hover:opacity-80 transition-opacity duration-300 cursor-pointer`} 
                    key={`highlightStudentsItemT${index}`}
                    onClick={()=>router.push(`/students/${student.id}`)}
                  >
                    <div className="highlightStudentsInfoConDB flex flex-row justify-flex-start items-flex-start gap-4">
                      <FiUser className="highlightStudentsPicDB text-2xl bg-white rounded-full"/>
                      <h3 className="highlightStudentsNameDB font-subtitle text-sm font-bold">{nameToString(student.firstName, student.lastName)}</h3>
                    </div>
                    <h3 className="highlightStudentsPNDB font-subtitle text-sm">Priority: <b>{student.priority}</b></h3>
                  </div>
                ))}
              </div>
            </div>
    );
}