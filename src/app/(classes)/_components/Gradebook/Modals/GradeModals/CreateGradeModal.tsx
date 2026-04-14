import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { createGrade } from "@/app/(classes)/_actions/grade-actions";
import { GradeFormState } from "@/app/lib/definitions";
import "../../Gradebook.css";

function CreateGradeModal({assignmentId, studentId, courseId}: {assignmentId: number, studentId: number, courseId: number}) {
  const [pending, startTransition] = useTransition();
  const [grade, setGrade] = useState(0);
  const [errors, setErrors] = useState<GradeFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await createGrade(assignmentId, studentId, grade, courseId);
      if (result instanceof Error) setErrors({ errors: ['Failed to create grade. Please try again.'] } as GradeFormState);
      else if (result && "errors" in result) setErrors(result);
      else closeModal();
    });
  };

  return (
    <div className='formCon'>
        <h1 className='inputTitle'>New Grade</h1>
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
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value))}
              required
            />
            {errors?.properties?.grade && <p className='labelTitle error'>{errors.properties.grade.errors.join(', ')}</p>}
          </div>
          <div className="submitCon">
            <button 
              className='btn submitButton'
              type="submit"
            >Submit</button>
          </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </form>
    </div>
  );
}

export default CreateGradeModal;