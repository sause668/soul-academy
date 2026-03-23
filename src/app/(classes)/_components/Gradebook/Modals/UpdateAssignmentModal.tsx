import { startTransition, useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { updateAssignment } from "@/app/(classes)/_actions/assignment-actions";
import { Assignment, AssignmentFormState } from "@/app/lib/definitions";
import { stringToType, typeToString } from "@/app/lib/typeConvertion";
import "../Gradebook.css";

export default function UpdateAssignmentModal({ assignment, quarter, courseId }: { assignment: Assignment, quarter: number, courseId: number }) {
  const [pending, startTransition] = useTransition();
  const [assignName, setAssignName] = useState(assignment.name ?? '');
  const [type, setType] = useState(typeToString(assignment.type ?? 'Classwork'));
  const [dueDate, setDueDate] = useState(assignment.dueDate?.toISOString().slice(0, 10) ?? '');
  const [errors, setErrors] = useState<AssignmentFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateAssignment(assignment.id ?? 0, courseId, assignName, stringToType(type), quarter, dueDate);

      if (result instanceof Error) setErrors({ errors: ['Failed to update assignment. Please try again.'] } as AssignmentFormState);
      else if (result && "errors" in result) setErrors(result);
      else closeModal();
    });
  };


  return (
    <div className='formCon'>
      <h1 className='inputTitle'>Edit Assignment</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className='inputCon'>
          <label htmlFor='assignName'>
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
          <label htmlFor='type'>
            <p className='labelTitle'>
              Type
            </p>
          </label>
          <select
            name="type"
            id="type"
            className="selectGB"
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
          <label htmlFor='dueDate'>
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
            className='submitButton'
            type="submit"
            disabled={
              !assignName.length ||
              !type.length ||
              !dueDate.length ||
              pending
            }
          >{pending ? 'Updating assignment...' : 'Submit'}</button>
        </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
      </form>

    </div>
  );
}

