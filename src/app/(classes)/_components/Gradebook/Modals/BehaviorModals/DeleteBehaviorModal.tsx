import { useModal } from "@/app/(_home)/_context/Modal";
import { deleteBehavior } from "@/app/(classes)/_actions/behavior-actions";
import { Behavior, BehaviorFormState } from "@/app/lib/definitions";
import { useState, useTransition } from "react";
import "../../Gradebook.css";

export default function DeleteBehaviorModal({behavior, courseId}: {behavior: Behavior, courseId: number}) {
    const {closeModal} = useModal();
    const [isPending, startTransition] = useTransition();
    const [errors, setErrors] = useState<BehaviorFormState>(undefined);

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteBehavior(behavior.id ?? 0, courseId);
            if (result instanceof Error) setErrors({ errors: ['Failed to delete behavior. Please try again.'] } as BehaviorFormState);
            else closeModal();
        });
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to delete ${behavior.student?.firstName ?? ''} ${behavior.student?.lastName ?? ''} behaviors?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes" disabled={isPending}>{isPending ? 'Deleting...' : 'Yes'}</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </div>
    )
}