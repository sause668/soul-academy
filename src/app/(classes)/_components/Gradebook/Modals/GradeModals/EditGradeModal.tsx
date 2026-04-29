import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { updateGrade } from "@/app/(classes)/_actions/grade-actions";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import DeleteGradeModal from "./DeleteGradeModal";
import { Grade, GradeFormState } from "@/app/lib/definitions";
import "../../Gradebook.css";

export default function EditGradeModal({assignmentId, studentId, grade, courseId}: {assignmentId: number, studentId: number, grade: number, courseId: number}) {
  const [pending, startTransition] = useTransition();
  const [currentGrade, setCurrentGrade] = useState(grade);
  const [errors, setErrors] = useState<GradeFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateGrade(assignmentId, studentId, currentGrade, courseId);
      if (result instanceof Error) setErrors({ errors: ['Failed to update grade. Please try again.'] } as GradeFormState);
      else if (result && "errors" in result) setErrors(result);
      else closeModal();
    });
  };



  return (
    <div className='formCon'>
        <h1 className='inputTitle'>Edit Grade</h1>
        <form onSubmit={handleSubmit}>
          <div className='inputCon'>
            <label htmlFor='grade'>
              <p className='labelTitle'>
                Grade
              </p>
            </label>
            <input
              className='formInput'
              id="grade"
              type="number"
              value={currentGrade}
              onChange={(e) => setCurrentGrade(parseInt(e.target.value))}
              required
            />
            {errors?.properties?.grade && <p className='labelTitle error'>{errors.properties.grade.errors.join(', ')}</p>}
          </div>
          <div className="submitCon">
            <button 
              className='btn submitBtn'
              type="submit"
            >Submit</button>
            <OpenModalButton
              buttonText={'Delete'}
              modalComponent={<DeleteGradeModal 
                assignmentId={assignmentId}
                studentId={studentId}
                courseId={courseId}
              />}
              cssClasses={'btn cancelBtn'}
            />
          </div>
          {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </form>
    </div>
  );
}