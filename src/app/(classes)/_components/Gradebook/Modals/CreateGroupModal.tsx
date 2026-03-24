import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { createGroup } from "@/app/(classes)/_actions/group-actions";
import { GroupFormState } from "@/app/lib/definitions";
import "../Gradebook.css";

function CreateGroupModal({courseId}: {courseId: number}) {
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<GroupFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
        const result = await createGroup(courseId, name);
        if (result instanceof Error) setErrors({ errors: ['Failed to create group. Please try again.'] } as GroupFormState);
        else if (result && "errors" in result) setErrors(result);
        else closeModal();
    });
  };

  return (
    <div className='formCon'>
        <h1 className='inputTitle'>Create Group</h1>
        <form onSubmit={handleSubmit}>
          <div className='inputCon'>
            <label htmlFor='name'>
              <p className='labelTitle'>
                Name
              </p>
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
          <div className="submitCon">
            <button 
              className='submitButton'
              type="submit"
              disabled={pending || !name.length}
            >{pending ? 'Submitting...' : 'Submit'}</button>
          </div>
          {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </form>
    </div>
  );
}

export default CreateGroupModal;