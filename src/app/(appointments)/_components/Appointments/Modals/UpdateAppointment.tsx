
import { useState, useEffect, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import "../Appointments.css";
import { Appointment, AppointmentFormState, Course, User } from "@/app/lib/definitions";
import AppStudentSearch from "./AppStudentSearch";
import { createAppointment, updateAppointment } from "@/app/(appointments)/_actions/appointment-actions";
import { getAppCourses } from "@/app/(appointments)/_actions/appointment-actions";
import { nameToString } from "@/app/lib/typeConvertion";

export default function UpdateAppointmentModal({ user, appointment }: { user: User, appointment: Appointment }) {
  const [pending, startTransition] = useTransition();
  const [courses, setCourses] = useState<Course[]>([]);
  
  // const [teacherId, setTeacherId] = useState('');
  const [studentId, setStudentId] = useState(appointment.student?.id ?? 0);
  const [courseId, setCourseId] = useState(appointment.course?.id?.toString() ?? '');
  const timeOffset = (appointment.startTime?.getTimezoneOffset() ?? 0) * 60000;
  const [startTime, setStartTime] = useState(new Date((appointment.startTime?.getTime() ?? 0) - timeOffset).toISOString().slice(0, 16) ?? '');
  const [endTime, setEndTime] = useState(new Date((appointment.endTime?.getTime() ?? 0) - timeOffset).toISOString().slice(0, 16) ?? '');
  const [name, setName] = useState(appointment.name ?? '');
  const [description, setDescription] = useState(appointment.description ?? '');
  const [errors, setErrors] = useState<AppointmentFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateAppointment(appointment.id ?? 0, user.teacher?.id ?? 0, studentId, parseInt(courseId), name, description, new Date(startTime), new Date(endTime));
      if (result instanceof Error) setErrors({ errors: ['Failed to update appointment. Please try again.'] } as AppointmentFormState);
      else if (result && "errors" in result) setErrors(result);
      else closeModal();
    });
  };

  const handleGetCourses = async () => {
    const courses = await getAppCourses(user.teacher?.id ?? 0);
    if (courses instanceof Error) return { errors: ['Failed to get courses. Please try again.'] } as AppointmentFormState;
    else if (courses && "errors" in courses) return setErrors(courses);
    else setCourses(courses as Course[]);
  }

  useEffect(() => {
    handleGetCourses();
  }, []);

  return (
    <div className='formCon'>
      <h1 className='inputTitle'>Update Appointment</h1>
      <form onSubmit={handleSubmit}>
        {/* Appointment Search */}
        <AppStudentSearch user={user} setStudentId={setStudentId} studentName={`${appointment.student?.firstName ?? ''} ${appointment.student?.lastName ?? ''}`} />
        {/* Course Select */}
        <div className='inputCon'>
          <label htmlFor='courseId'>
            <p className='labelTitle'>Course</p>
          </label>
          <select
            className='formSelectInput'
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} - Period: {course.period}
              </option>
            ))}
          </select>
          {errors?.properties?.courseId && <p className='labelTitle error'>{errors.properties.courseId.errors.join(', ')}</p>}
        </div>
        {/* Start Date and Time */}
        <div className='inputCon'>
          <label htmlFor='startTime'>
            <p className='labelTitle'>Start Time</p>
          </label>
          <input
            className='formInput'
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          // min={new Date().toISOString()}
          />
          {errors?.properties?.startTime && <p className='labelTitle error'>{errors.properties.startTime.errors.join(', ')}</p>}
        </div>
        {/* End Date and Time */}
        <div className='inputCon'>
          <label htmlFor='endTime'>
            <p className='labelTitle'>End Time</p>
          </label>
          <input
            className='formInput'
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          {errors?.properties?.endTime && <p className='labelTitle error'>{errors.properties.endTime.errors.join(', ')}</p>}
        </div>
        {/* Name */}
        <div className='inputCon'>
          <label htmlFor='name'>
            <p className='labelTitle'>Name</p>
          </label>
          <input
            className='formInput'
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors?.properties?.name && <p className='labelTitle error'>{errors.properties.name.errors.join(', ')}</p>}
        </div>
        {/* Description */}
        <div className='inputCon'>
          <label htmlFor='description'>
            <p className='labelTitle'>Description (Optional)</p>
          </label>
          <textarea
            className='formInput'
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            maxLength={1000}
          />
          {errors?.properties?.description && <p className='labelTitle error'>{errors.properties.description.errors.join(', ')}</p>}
        </div>
        {/* Submit */}
        <div className="submitCon">
          <button
            className='submitButton'
            type="submit"
            disabled={!studentId || !courseId || !startTime || !endTime || !name || pending}
          >{pending ? 'Updating...' : 'Update'}</button>
        </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
      </form>
    </div>
  );
}