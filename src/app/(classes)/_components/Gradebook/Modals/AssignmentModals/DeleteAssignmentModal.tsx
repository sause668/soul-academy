import { useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { deleteAssignment } from "@/app/(classes)/_actions/assignment-actions";
import { Assignment } from "@/app/lib/definitions";
import { useState } from "react";
import "../../Gradebook.css";


export default function DeleteAssignmentModal({ assignment, quarter, courseId }: { assignment: Assignment, quarter: number, courseId: number }) {
    const [pending, startTransition] = useTransition();
    const {closeModal} = useModal();
    const [errors, setErrors] = useState('');

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteAssignment(assignment.id ?? 0, courseId);
            if (result instanceof Error) setErrors('Failed to delete assignment. Please try again.');
            else closeModal();
        });
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText font-subtitle text-lg">{`Are you sure you want to delete ${assignment.name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="btn">Yes</button>
                <button onClick={closeModal} className="btn cancelBtn">No</button>
            </div>
            {errors && <p className='labelTitle error'>{errors}</p>}
        </div>
    )
}