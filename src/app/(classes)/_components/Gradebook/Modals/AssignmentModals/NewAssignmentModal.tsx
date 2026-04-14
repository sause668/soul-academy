import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { createAssignment } from "@/app/(classes)/_actions/assignment-actions";
import { stringToType } from "@/app/lib/typeConvertion";
import { AssignmentFormState } from "@/app/lib/definitions";
import "../../Gradebook.css";

function NewAssignmentModal({courseId, quarter}: {courseId: number, quarter: number}) {
  const [pending, startTransition] = useTransition();
  const [assignName, setAssignName] = useState('');
  const [type, setType] = useState('Classwork');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<AssignmentFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
        const result = await createAssignment(courseId, assignName, stringToType(type), quarter, dueDate);

        if (result instanceof Error) setErrors({ errors: ['Failed to create assignment. Please try again.'] } as AssignmentFormState);
        else if (result && "errors" in result) setErrors(result);
        else closeModal();
    });
  };



  return (
    
    <div className='formCon'>
        <h1 className='inputTitle'>New Assignment</h1>
        <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className='inputCon'>
          <label className='labelCon' htmlFor='assignName'>
            <p className='labelTitle'>
              Assignment Name
            </p>
          </label>
          <input
            className='formInput'
            id="assignName"
            type="text"
            value={assignName}
            onChange={(e) => setAssignName(e.target.value)}
            required
          />
          {errors?.properties?.name && <p className='labelTitle error'>{errors.properties.name.errors.join(', ')}</p>}
        </div>
        {/* Type */}
        <div className='inputCon'>
          <label className='labelCon' htmlFor='type'>
            <p className='labelTitle'>
              Type
            </p>
          </label>
          <select 
            name="type" 
            id="type" 
            className="formSelectInput"
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value='Classwork'>Classwork</option>
            <option value='Homework'>Homework</option>
            <option value='Quiz'>Quiz</option>
            <option value='Test'>Test</option>
            <option value='Project'>Project</option>
          </select>
          {errors?.properties?.type && <p className='labelTitle error'>{errors.properties.type.errors.join(', ')}</p>}
        </div>
        {/* Due Date */}
        <div className='inputCon'>
          <label className='labelCon' htmlFor='dueDate'>
            <p className='labelTitle'>
              Due Date
            </p>
          </label>
          <input
            className='formInput'
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          {errors?.properties?.dueDate && <p className='labelTitle error'>{errors.properties.dueDate.errors.join(', ')}</p>}
        </div>
        <div className="submitCon">
            <button 
                className='btn submitBtn'
                type="submit"
                disabled={
                  !assignName.length ||
                  !type.length ||
                  !dueDate.length || 
                  pending
                }
            >{pending ? 'Creating assignment...' : 'Submit'}</button>
        </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </form>
    </div>
  );
}

export default NewAssignmentModal;