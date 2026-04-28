import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import UpdateAppointmentModal from "./Modals/UpdateAppointment";
import DeleteAppointmentModal from "./Modals/DeleteAppointment";
import { MdEdit, MdDelete } from "react-icons/md";
import { formatAppointmentDate, formatAppointmentTime } from "@/app/lib/typeConversion";
import { Appointment, User } from "@/app/lib/definitions";

export default function AppointmentList({ appointments, user }: { appointments: Appointment[], user: User }) {

  return (
    <div className="whiteBox min-h-[400px] w-[95%] sm:w-[90%] md:w-[70%] lg:w-[67%] xl:w-[65%] p-4">
      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg">No appointments scheduled</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded border border-gray-300 p-4 transition-all duration-200 ease-in-out font-body hover:bg-blue-50 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="mb-2 flex flex-col gap-1">
                      <h2 className="font-subtitle text-3xl font-bold">
                        {appointment.name}
                      </h2>
                      <h3 className="font-subtitle text-xl ">
                        {formatAppointmentDate(appointment.startTime)}
                      </h3>
                      <p className="text-lg text-gray-700">
                        {formatAppointmentTime(appointment.startTime)} - {formatAppointmentTime(appointment.endTime)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-6">
                    {user.role === 'teacher' ? (
                      <div>
                        <p className="text-sm text-gray-500">Student:</p>
                        <p className="text-base">
                          {`${appointment.student?.firstName} ${appointment.student?.lastName}`}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-500">Teacher:</p>
                        <p className="text-base">
                          {`${appointment.teacher?.firstName} ${appointment.teacher?.lastName}`}
                        </p>
                      </div>
                    )}
                    {appointment.course && (
                      <div>
                        <p className="text-sm text-gray-500">Course:</p>
                        <p className="text-base">
                          {`${appointment.course?.name}`} - Period {appointment.course?.period}
                        </p>
                      </div>
                    )}
                  </div>

                  {appointment.description && (
                    <div className="mt-1 border-t border-gray-200 pt-3">
                      <p className="text-sm text-gray-500">Notes:</p>
                      <p className="text-base text-screenBlack">{appointment.description}</p>
                    </div>
                  )}
                </div>

                {user.role === 'teacher' && <div className="flex shrink-0 items-center gap-2">
                  <OpenModalButton
                    buttonText={<MdEdit className="text-xl" />}
                    modalComponent={<UpdateAppointmentModal user={user} appointment={appointment} />}
                    cssClasses={'btn p-2'}
                  />
                  <OpenModalButton
                    buttonText={<MdDelete className="text-xl" />}
                    modalComponent={<DeleteAppointmentModal appointmentId={appointment.id ?? 0} />}
                    cssClasses={'btn cancelBtn p-2'}
                  />
                </div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}