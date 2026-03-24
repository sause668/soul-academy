import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import { updateGroup } from "@/app/(classes)/_actions/group-actions";
import { GroupFormState } from "@/app/lib/definitions";
import DeleteGroupModal from "./DeleteGroupModal";
import "../Gradebook.css";

export default function EditGroupModal({ groupId, name, courseId }: { groupId: number, name: string, courseId: number }) {
  const [pending, startTransition] = useTransition();
  const [currentName, setCurrentName] = useState(name);
  const [errors, setErrors] = useState<GroupFormState>(undefined);
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateGroup(groupId, currentName, courseId);
      if (result instanceof Error) setErrors({ errors: ['Failed to edit group. Please try again.'] } as GroupFormState);
      else if (result && "errors" in result) setErrors(result);
      else closeModal();
    });
  }


  return (
    <div className='formCon'>
      <h1 className='inputTitle'>Edit Group</h1>
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
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            required
          />
          {errors?.properties?.name && <p className='labelTitle error'>{errors.properties.name.errors.join(', ')}</p>}
        </div>
        <div className="submitCon">
          <button
            className='submitButton'
            type="submit"
            disabled={pending || !currentName.length}
          >{pending ? 'Submitting...' : 'Submit'}</button>
          <OpenModalButton
            buttonText={'Delete'}
            modalComponent={<DeleteGroupModal
              groupId={groupId}
              courseId={courseId}
            />}
            cssClasses={'submitButton deleteButton'}
          />
        </div>
        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
      </form>
    </div>
  );
}