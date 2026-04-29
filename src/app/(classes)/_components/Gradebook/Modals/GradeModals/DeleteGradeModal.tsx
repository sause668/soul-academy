import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { deleteGrade } from "@/app/(classes)/_actions/grade-actions";
import { GradeFormState } from "@/app/lib/definitions";
import "../../Gradebook.css";


const DeleteGradeModal = ({studentId, assignmentId, courseId}: {studentId: number, assignmentId: number, courseId: number}) => {
    const [pending, startTransition] = useTransition();
    const {closeModal} = useModal();
    const [errors, setErrors] = useState<GradeFormState>(undefined);

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteGrade(assignmentId, studentId, courseId);
            if (result instanceof Error) setErrors({ errors: ['Failed to delete grade. Please try again.'] } as GradeFormState);
            else closeModal();
        });
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to delete this Grade?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="btn" disabled={pending}>Yes</button>
                <button onClick={closeModal} className="btn cancelBtn">No</button>
            </div>
            {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
        </div>
    )
}

export default DeleteGradeModal