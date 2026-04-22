import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./Appointments.css";
import { editAppointment, fetchAppointments } from "../../redux/appointment";
import { fetchStudents } from "../../redux/student";
import { fetchTeachers } from "../../redux/teacher";

function EditAppointmentModal({ appointment }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const students = useSelector((state) => state.student.students) || [];
  const teachers = useSelector((state) => state.teacher.teachers) || [];
  
  const [teacherId, setTeacherId] = useState(appointment.teacher_id || '');
  const [studentId, setStudentId] = useState(appointment.student_id || '');
  const [appointmentDate, setAppointmentDate] = useState(
    appointment.appointment_date ? appointment.appointment_date.split('T')[0] : ''
  );
  const [appointmentTime, setAppointmentTime] = useState(
    appointment.appointment_time || ''
  );
  const [notes, setNotes] = useState(appointment.notes || '');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (user?.type === 'teacher') {
      dispatch(fetchStudents());
    } else if (user?.type === 'student') {
      dispatch(fetchTeachers());
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      editAppointment({
        appointmentId: appointment.id,
        teacher_id: parseInt(teacherId),
        student_id: parseInt(studentId),
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        notes: notes || null
      })
    );

    if (serverResponse && serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      dispatch(fetchAppointments());
      closeModal();
    }
  };

  return (
    <div className='formCon'>
      <h1 className='inputTitle'>Edit Appointment</h1>
      <form onSubmit={handleSubmit}>
        {user?.type === 'teacher' ? (
          <div className='inputCon'>
            <label htmlFor='studentId'>
              <p className='labelTitle'>Student</p>
            </label>
            <select
              className='formInput'
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            >
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.last_name}, {student.first_name} - Grade {student.grade}
                </option>
              ))}
            </select>
            {errors.student_id && <p className='labelTitle error'>{errors.student_id}</p>}
          </div>
        ) : (
          <div className='inputCon'>
            <label htmlFor='teacherId'>
              <p className='labelTitle'>Teacher</p>
            </label>
            <select
              className='formInput'
              id="teacherId"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.last_name}, {teacher.first_name} - {teacher.primary_grade}th Grade {teacher.primary_subject}
                </option>
              ))}
            </select>
            {errors.teacher_id && <p className='labelTitle error'>{errors.teacher_id}</p>}
          </div>
        )}
        
        <div className='inputCon'>
          <label htmlFor='appointmentDate'>
            <p className='labelTitle'>Date</p>
          </label>
          <input
            className='formInput'
            id="appointmentDate"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.appointment_date && <p className='labelTitle error'>{errors.appointment_date}</p>}
        </div>
        
        <div className='inputCon'>
          <label htmlFor='appointmentTime'>
            <p className='labelTitle'>Time</p>
          </label>
          <input
            className='formInput'
            id="appointmentTime"
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
          {errors.appointment_time && <p className='labelTitle error'>{errors.appointment_time}</p>}
        </div>
        
        <div className='inputCon'>
          <label htmlFor='notes'>
            <p className='labelTitle'>Notes (Optional)</p>
          </label>
          <textarea
            className='formInput'
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            maxLength={1000}
          />
          {errors.notes && <p className='labelTitle error'>{errors.notes}</p>}
        </div>
        
        <div className="submitCon">
          <button 
            className='submitButton'
            type="submit"
            disabled={!teacherId || !studentId || !appointmentDate || !appointmentTime}
          >Update</button>
        </div>
        {errors.message && <p className='labelTitle error'>{errors.message}</p>}
      </form>
    </div>
  );
}

export default EditAppointmentModal;

