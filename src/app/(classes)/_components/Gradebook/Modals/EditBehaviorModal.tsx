import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { updateBehavior } from "@/app/(classes)/_actions/behavior-actions";
import DeleteBehaviorModal from "./DeleteBehaviorModal";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import { Behavior, BehaviorFormState } from "@/app/lib/definitions";
import "../Gradebook.css";

export default function EditBehaviorModal({behavior, courseId}: {behavior: Behavior, courseId: number}) {
  const [pending, startTransition] = useTransition();
  const [attention, setAttention] = useState(behavior.attention ?? 0);
  const [learnability, setLearnability] = useState(behavior.learnability ?? 0);
  const [cooperation, setCooperation] = useState(behavior.cooperation ?? 0);
  const [errors, setErrors] = useState<BehaviorFormState>(undefined);
  const { closeModal } = useModal();
  

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
        const result = await updateBehavior(behavior.id ?? 0, courseId, attention, learnability, cooperation);
        if (result instanceof Error) setErrors({ errors: ['Failed to update behavior. Please try again.'] } as BehaviorFormState);
        else if (result && "errors" in result) setErrors(result);
        else closeModal();
    });
  };


  return (
    <div className='formCon'>
        <h1 className='inputTitle'>{`Edit ${behavior.student?.firstName ?? ''} ${behavior.student?.lastName ?? ''} Behaviors`}</h1>
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
          <OpenModalButton
              buttonText={'Delete'}
              modalComponent={<DeleteBehaviorModal behavior={behavior} courseId={courseId} />}
              cssClasses={'submitButton deleteButton'}
            />
        </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </form>
    </div>
  );
}