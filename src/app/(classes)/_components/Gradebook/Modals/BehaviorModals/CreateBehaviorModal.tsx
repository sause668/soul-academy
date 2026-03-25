import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { createBehavior } from "@/app/(classes)/_actions/behavior-actions";
import { BehaviorFormState, Student } from "@/app/lib/definitions";
import "../../Gradebook.css";

export default function CreateBehaviorModal({courseId, student}: {courseId: number, student: Student}) {
  const [pending, startTransition] = useTransition();
  const [attention, setAttention] = useState(3);
  const [learnability, setLearnability] = useState(3);
  const [cooperation, setCooperation] = useState(3);
  const [errors, setErrors] = useState<BehaviorFormState>(undefined);
  const { closeModal } = useModal();
  

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
        const result = await createBehavior(student.id ?? 0, courseId, attention, learnability, cooperation);
        if (result instanceof Error) setErrors({ errors: ['Failed to update behavior. Please try again.'] } as BehaviorFormState);
        else if (result && "errors" in result) setErrors(result);
        else closeModal();
    });
  };


  return (
    <div className='formCon'>
        <h1 className='inputTitle'>{`Create Behaviors for ${student?.firstName ?? ''} ${student?.lastName ?? ''}`}</h1>
        <form onSubmit={handleSubmit}>
        {/* Attention */}
        <div className='inputCon'>
          <label htmlFor='attention'>
            <p className='labelTitle'>
              Attention
            </p>
          </label>
          <select 
            name="attention" 
            id="attention" 
            className="selectGB"
            value={attention} 
            onChange={(e) => setAttention(parseInt(e.target.value))}
          >
            <option value={1}>Poor</option>
            <option value={2}>Lacking</option>
            <option value={3}>Average</option>
            <option value={4}>Good</option>
            <option value={5}>Excellent</option>
          </select>
          {errors?.properties?.attention && <p className='labelTitle error'>{errors.properties.attention.errors.join(', ')}</p>}
        </div>
        {/* Learnability */}
        <div className='inputCon'>
          <label htmlFor='learnability'>
            <p className='labelTitle'>
              Learnability
            </p>
          </label>
          <select 
            name="learnability" 
            id="learnability" 
            className="selectGB"
            value={learnability} 
            onChange={(e) => setLearnability(parseInt(e.target.value))}
          >
            <option value={1}>Poor</option>
            <option value={2}>Lacking</option>
            <option value={3}>Average</option>
            <option value={4}>Good</option>
            <option value={5}>Excellent</option>
          </select>
          {errors?.properties?.learnability && <p className='labelTitle error'>{errors.properties.learnability.errors.join(', ')}</p>}
        </div>
        {/* Cooperation */}
        <div className='inputCon'>
          <label htmlFor='cooperation'>
            <p className='labelTitle'>
              Cooperation
            </p>
          </label>
          <select 
            name="cooperation" 
            id="cooperation" 
            className="selectGB"
            value={cooperation} 
            onChange={(e) => setCooperation(parseInt(e.target.value))}
          >
            <option value={1}>Poor</option>
            <option value={2}>Lacking</option>
            <option value={3}>Average</option>
            <option value={4}>Good</option>
            <option value={5}>Excellent</option>
          </select>
          {errors?.properties?.cooperation && <p className='labelTitle error'>{errors.properties.cooperation.errors.join(', ')}</p>}
        </div>
        <div className="submitCon">
          <button 
              className='submitButton'
              type="submit"
              disabled={pending}
            >{pending ? 'Submitting...' : 'Submit'}</button>
        </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </form>
    </div>
  );
}