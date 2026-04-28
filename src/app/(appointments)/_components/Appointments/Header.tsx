import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import CreateAppointmentModal from "./Modals/CreateAppointment";
import { FiPlus } from "react-icons/fi";
import { User } from "@/app/lib/definitions";

export default function AppointmentsHeader({ user }: { user: User }) {
    return (
        <div className="whiteBox mb-4 p-3">
            <div className="flex justify-center items-center gap-4 ">
                <h1 className="font-title text-3xl md:text-4xl font-bold">Appointments</h1>
                {user.role === 'teacher' && <OpenModalButton
                    buttonText={<FiPlus className="text-2xl" />}
                    modalComponent={<CreateAppointmentModal user={user} />}
                    cssClasses={'bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2'}
                />
                }
            </div>
        </div>
    )
}