import { useTransition, useState } from "react";
import { deleteAnnouncement } from "@/app/(_home)/_actions/announcement-actions";
import { useModal } from "@/app/(_home)/_context/Modal";
import { Announcement } from "@/app/lib/definitions";


export default function DeleteAnnouncementModal({ announcement }: { announcement: Announcement }) {
    const [pending, startTransition] = useTransition();
    const {closeModal} = useModal();
    const [errors, setErrors] = useState('');

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteAnnouncement(announcement.id ?? 0, announcement.userId ?? 0);
            if (result instanceof Error) setErrors('Failed to delete announcement. Please try again.');
            else closeModal();
        });
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText font-subtitle text-lg">{`Are you sure you want to delete this announcement?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="btn" disabled={pending}>{pending ? 'Deleting...' : 'Yes'}</button>
                <button onClick={closeModal} className="btn cancelBtn">No</button>
            </div>
            {errors && <p className='labelTitle error'>{errors}</p>}
        </div>
    )
}
