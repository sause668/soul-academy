'use client'

import Header from "./Header";
import AppointmentList from "./AppointmentList";
import { Appointment, User } from "@/app/lib/definitions";

export default function Appointments({ appointments, user }: { appointments: Appointment[], user: User }) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-start gap-4 py-5">
      <Header user={user} />
      <AppointmentList appointments={appointments} user={user} />
    </div>
  );
}
