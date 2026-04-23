import { useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { deleteAssignment } from "@/app/(classes)/_actions/assignment-actions";
import { Assignment } from "@/app/lib/definitions";
import { useState } from "react";
import "../Appointments.css";
import { deleteAppointment } from "@/app/(appointments)/_actions/appointment-actions";


export default function DeleteAppointmentModal({ appointmentId }: { appointmentId: number }) {
    const [pending, startTransition] = useTransition();
    const {closeModal} = useModal();
    const [errors, setErrors] = useState('');

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteAppointment(appointmentId);
            if (result instanceof Error) setErrors('Failed to delete appointment. Please try again.');
            else closeModal();
        });
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText font-subtitle text-lg">{`Are you sure you want to delete this appointment?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="btn" disabled={pending}>{pending ? 'Deleting...' : 'Yes'}</button>
                <button onClick={closeModal} className="btn cancelBtn">No</button>
            </div>
            {errors && <p className='labelTitle error'>{errors}</p>}
        </div>
    )
}
