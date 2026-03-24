
import { useModal } from "@/app/(_home)/_context/Modal";
import { GroupFormState } from "@/app/lib/definitions";
import { deleteGroup } from "@/app/(classes)/_actions/group-actions";
import { useState, useTransition } from "react";
import "../Gradebook.css";


export default function DeleteGroupModal({groupId, courseId}: {groupId: number, courseId: number}) {
    const [pending, startTransition] = useTransition();
    const {closeModal} = useModal();
    const [errors, setErrors] = useState<GroupFormState>(undefined);

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteGroup(groupId, courseId);
            if (result instanceof Error) setErrors({ errors: ['Failed to delete group. Please try again.'] } as GroupFormState);
            else if (result && "errors" in result) setErrors(result);
            else closeModal();
        });
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to delete this Group?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes" disabled={pending}>{pending ? 'Deleting...' : 'Yes'}</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </div>
    )
}