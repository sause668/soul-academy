import { getSession } from "@/app/(_home)/_actions/user-actions";
import { getAppointments } from "../_actions/appointment-actions";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";
import Landing from "@/app/(_home)/_components/Landing/Landing";
import Appointments from "../_components/Appointments/Appointments";

export default async function AppointmentsPage() {
    const session = await getSession();
    if (session instanceof Error) {
        if (session.message === 'No session found') return <Landing />
        else return <ErrorPage />
    }
    const appointmentsData = await getAppointments(session);
    if (appointmentsData instanceof Error) return <ErrorPage />
    return <Appointments appointments={appointmentsData.appointments} user={appointmentsData.user} />
}