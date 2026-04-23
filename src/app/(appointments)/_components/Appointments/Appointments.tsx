'use client'
import { FiPlus } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import CreateAppointmentModal from "./Modals/CreateAppointment";
// import EditAppointment from "./Modals/UpdateAppointment";
// import DeleteAppointment from "./Modals/DeleteAppointment";
import { nameToString, formatAppointmentDate, formatAppointmentTime } from "@/app/lib/typeConvertion";
import { Appointment, AppointmentFormState, Course, User } from "@/app/lib/definitions";
import "./Appointments.css";
import { getAppCourses } from "../../_actions/appointment-actions";
import { useState } from "react";
import UpdateAppointmentModal from "./Modals/UpdateAppointment";
import DeleteAppointmentModal from "./Modals/DeleteAppointment";

export default function Appointments({ appointments, user }: { appointments: Appointment[], user: User }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [errors, setErrors] = useState<AppointmentFormState>(undefined);

  const handleCreateAppointment = async () => {
    const courses = await getAppCourses(user.teacher?.id ?? 0);
    if (courses instanceof Error) return { errors: ['Failed to get courses. Please try again.'] } as AppointmentFormState;
    else if (courses && "errors" in courses) return setErrors(courses);
    else setCourses(courses as Course[]);
  }

  return (
    <div id="appointmentsCon" className="flex flex-col justify-start items-center gap-4 py-5">
      <div id="appointmentsHeaderCon" className="whiteBox w-[70%] p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Appointments</h1>
          {user.role === 'teacher' && <OpenModalButton
            buttonText={
              <div className="flex items-center gap-2">
                <FiPlus className="text-xl" />
                <span>Schedule Appointment</span>
              </div>
            }
            modalComponent={<CreateAppointmentModal user={user} />}
            cssClasses={'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2'}
          />
          }
        </div>
      </div>

      <div id="appointmentsListCon" className="whiteBox w-[70%] p-4">
        {appointments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">No appointments scheduled</p>
            <p className="text-sm mt-2">Click &quot;Schedule Appointment&quot; to create one</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="appointmentItemCon border border-gray-300 rounded p-4 hover:bg-blue-50 transition-colors duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="appointmentDateCon">
                        <h3 className="text-xl font-bold text-blue-600">
                          {formatAppointmentDate(appointment.startTime)}
                        </h3>
                        <p className="text-lg text-gray-700">
                          {formatAppointmentTime(appointment.startTime)}
                        </p>
                      </div>
                    </div>

                    <div className="appointmentParticipantsCon mt-3">
                      {user.role === 'teacher' ? (
                        <div>
                          <p className="text-sm text-gray-500">Student:</p>
                          <p className="text-base font-semibold">
                            {`${appointment.student?.firstName} ${appointment.student?.lastName}`}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-500">Teacher:</p>
                          <p className="text-base font-semibold">
                            {`${appointment.teacher?.firstName} ${appointment.teacher?.lastName}`}
                          </p>
                        </div>
                      )}
                    </div>

                    {appointment.description && (
                      <div className="appointmentNotesCon mt-3">
                        <p className="text-sm text-gray-500">Notes:</p>
                        <p className="text-base text-gray-700">{appointment.description}</p>
                      </div>
                    )}
                  </div>

                  {user.role === 'teacher' && <div className="appointmentActionsCon flex items-center gap-2">
                    <OpenModalButton
                      buttonText={<MdEdit className="text-xl" />}
                      modalComponent={<UpdateAppointmentModal user={user} appointment={appointment} />}
                      cssClasses={'text-white hover:text-blue-700 p-2 rounded hover:bg-blue-100 transition-colors duration-300'}
                    />
                    <OpenModalButton
                      buttonText={<MdDelete className="text-xl" />}
                      modalComponent={<DeleteAppointmentModal appointmentId={appointment.id ?? 0} />}
                      cssClasses={'text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-100 transition-colors duration-300'}
                    />
                  </div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
