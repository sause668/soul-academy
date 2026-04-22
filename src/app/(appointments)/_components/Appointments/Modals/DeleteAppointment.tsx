
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./Appointments.css";
import { removeAppointment, fetchAppointments } from "../../redux/appointment";
import { useState } from "react";

const DeleteAppointmentModal = ({ appointment }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const handleDelete = async () => {
        const serverResponse = await dispatch(removeAppointment({ appointmentId: appointment.id }));

        if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            dispatch(fetchAppointments());
            closeModal();
        }
    };
    
    return (
        <div className="formCon">
            <h3 className="confirmTextCon">
                {`Are you sure you want to delete the appointment on ${formatDate(appointment.appointment_date)} at ${formatTime(appointment.appointment_time)}?`}
            </h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </div>
    );
};

export default DeleteAppointmentModal;
