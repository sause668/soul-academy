import { useModal } from "@/app/(_home)/_context/Modal";
import "./Deck.css";
import { useState } from "react";
import { Deck } from "@/app/lib/definitions";
import { deleteDeck } from "@/app/(decks)/_actions/decks_actions";
import { useRouter } from "next/navigation";


export default function DeleteDeckModal({deckDelete}: {deckDelete: Deck}) {
    const {closeModal} = useModal();
    const router = useRouter();
    const [errors, setErrors] = useState<string>('');

    const handleDelete = async () => {
        const result = await deleteDeck(deckDelete.id.toString());

        if (result instanceof Error) setErrors(result.message);
        else {
            closeModal();
            router.push('/decks');
        }
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmTextCon">{`Are you sure you want to delete '${deckDelete.name}'?`}</h3>
            <div className="confirmButtonCon">
                <button className="btn" onClick={handleDelete}>Yes</button>
                <button className="btn cancelBtn" onClick={closeModal}>No</button>
            </div>
            {errors && <p className='labelTitle error'>{errors}</p>}
        </div>
    )
}
