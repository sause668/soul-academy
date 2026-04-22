
import { useState, useEffect, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import "../Appointments.css";
import { AppointmentFormState, Course, User } from "@/app/lib/definitions";
import AppStudentSearch from "./AppStudentSearch";
import { createAppointment } from "@/app/(appointments)/_actions/appointment-actions";
import { getAppCourses } from "@/app/(appointments)/_actions/appointment-actions";

function CreateAppointmentModal({ user }: { user: User }) {
  const [pending, startTransition] = useTransition();
  const [courses, setCourses] = useState<Course[]>([]);
  
  // const [teacherId, setTeacherId] = useState('');
  const [studentId, setStudentId] = useState(0);
  const [courseId, setCourseId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<AppointmentFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await createAppointment(user.teacher?.id ?? 0, studentId, parseInt(courseId), name, description, new Date(startTime), new Date(endTime));
      if (result instanceof Error) setErrors({ errors: ['Failed to create appointment. Please try again.'] } as AppointmentFormState);
      else if (result && "errors" in result) setErrors(result);
      else closeModal();
    });
  };

  const handleCreateAppointment = async () => {
    const courses = await getAppCourses(user.teacher?.id ?? 0);
    if (courses instanceof Error) return { errors: ['Failed to get courses. Please try again.'] } as AppointmentFormState;
    else if (courses && "errors" in courses) return setErrors(courses);
    else setCourses(courses as Course[]);
  }

  useEffect(() => {
    handleCreateAppointment();
  }, []);

  return (
    <div className='formCon'>
      <h1 className='inputTitle'>Schedule Appointment</h1>
      <form onSubmit={handleSubmit}>
        {/* Appointment Search */}
        <AppStudentSearch user={user} setStudentId={setStudentId} />
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
            {/* <option value="">Course</option> */}
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
          <label htmlFor='appointmentDate'>
            <p className='labelTitle'>Date</p>
          </label>
          <input
            className='formInput'
            id="appointmentDate"
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
          <label htmlFor='appointmentTime'>
            <p className='labelTitle'>Time</p>
          </label>
          <input
            className='formInput'
            id="appointmentTime"
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
          >{pending ? 'Scheduling...' : 'Schedule'}</button>
        </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
      </form>
    </div>
  );
}

export default CreateAppointmentModal;


// {/* {user.role === 'teacher' ? (
//           <div className='inputCon'>
//             <label htmlFor='studentId'>
//               <p className='labelTitle'>Student</p>
//             </label>
//             <select
//               className='formInput'
//               id="studentId"
//               value={studentId}
//               onChange={(e) => setStudentId(e.target.value)}
//               required
//             >
//               <option value="">Select a student</option>
//               {students.map((student) => (
//                 <option key={student.id} value={student.id}>
//                   {student.last_name}, {student.first_name} - Grade {student.grade}
//                 </option>
//               ))}
//             </select>
//             {errors.student_id && <p className='labelTitle error'>{errors.student_id}</p>}
//           </div>
//         ) : (
//           // Student Search
//           <div className='inputCon'>
//             <label htmlFor='teacherId'>
//               <p className='labelTitle'>Teacher</p>
//             </label>
//             <select
//               className='formInput'
//               id="teacherId"
//               value={teacherId}
//               onChange={(e) => setTeacherId(e.target.value)}
//               required
//             >
//               <option value="">Select a teacher</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher.id} value={teacher.id}>
//                   {teacher.last_name}, {teacher.first_name} - {teacher.primary_grade}th Grade {teacher.primary_subject}
//                 </option>
//               ))}
//             </select>
//             {errors.teacher_id && <p className='labelTitle error'>{errors.teacher_id}</p>}
//           </div>
//         )} */}