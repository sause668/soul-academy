import { Appointment } from "@/app/lib/definitions";
import { FiUser } from "react-icons/fi";
import { formatAppointmentDate, formatAppointmentTime } from "@/app/lib/typeConvertion";
import { nameToString } from "@/app/lib/typeConvertion";
import { useRouter } from "next/navigation";
import "@/app/(_home)/_components/Dashboard/Dashboard.css";


export default function Appointments({ appointments }: { appointments: Appointment[] }) {
    const router = useRouter();
    return (
        <div id="appsConDB" className="whiteBox w-full">
              <h2 id="appsTitleDB" className="text-xl text-center font-bold bg-blue-500 text-white p-2 rounded-t-lg">Appointments</h2>
              <div id="appsListDB" className="flex flex-col justify-flex-start items-flex-start">
                {appointments.length === 0 ? (
                  <div className="text-center text-gray-500 py-4 px-2 w-full">
                    <p className="text-sm">No appointments scheduled</p>
                  </div>
                ) : (
                  appointments.slice(0, 5).map((appointment, index) => (
                    <div 
                      className="appsItemDB flex justify-between items-center gap-2 px-2 py-1.5 hover:bg-blue-100 transition-colors duration-300 cursor-pointer w-full" 
                      key={`appsItemT${appointment.id}`}
                      onClick={() => router.push(`/appointments/${appointment.id}`)}
                    >
                      <div className="appsPicConDB shrink-0 grow-0">
                        <FiUser className="appsPicDB text-2xl bg-white rounded-full"/>
                      </div>
                      <h3 className="appsDateDB text-sm font-bold shrink grow">{formatAppointmentDate(appointment.startTime)}</h3>
                      <h3 className="appsTimeDB text-sm shrink grow">{formatAppointmentTime(appointment.startTime)}</h3>
                      <h4 className="appsNameDB text-sm shrink grow">{nameToString(appointment.student?.firstName ?? '', appointment.student?.lastName ?? '')}</h4>
                    </div>
                  ))
                )}
              </div>
            </div>
    );
}