"use client";

import { useState, useTransition } from "react";
import { useModal } from "@/app/(_home)/_context/Modal";
import { Deck, DeckFormState } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import "./Deck.css";
import { updateDeck } from "@/app/(decks)/_actions/decks_actions";
import DeleteDeckModal from "@/app/(decks)/_components/Deck/DeleteDeckModal";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";

export default function EditDeckModal({ deck }: { deck: Deck }) {
    const router = useRouter();
    const [deckName, setDeckName] = useState(deck.name);
    const [deckDescription, setDeckDescription] = useState(deck.description);
    const [errors, setErrors] = useState<DeckFormState>(undefined);
    const [pending, startTransition] = useTransition();
    const { closeModal } = useModal();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            const result = await updateDeck(deck.id.toString(), deckName, deckDescription);

            if (result instanceof Error) setErrors({ errors: ['Failed to update deck. Please try again.'] } as DeckFormState);
            else if (result && "errors" in result) setErrors(result);
            else router.push(`/decks/${deck.id}`);
            closeModal();
        });

    };

    return (
        <div className='formCon'>
            <h1 className='inputTitle'>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                {/* Deck Name */}
                <div className='inputCon' >
                    <label className='labelCon' htmlFor='deckName'>
                        <p className='labelTitle'>
                            Deck Name
                        </p>
                    </label>
                    <input
                        className='formInput'
                        id="deckName"
                        type="text"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        required
                    />
                    {errors?.properties?.deckName && <p className='labelTitle error'>{errors.properties.deckName.errors.join(', ')}</p>}
                </div>
                {/* Deck Description */}
                <div className='inputCon'>
                    <label className='labelCon' htmlFor='deckDescription'>
                        <p className='labelTitle'>Deck Description</p>
                    </label>
                    <input
                        id="emailS"
                        className='formInput'
                        type="text"
                        value={deckDescription}
                        onChange={(e) => setDeckDescription(e.target.value)}
                        required
                    />
                    {errors?.properties?.deckDescription && <p className='labelTitle error'>{errors.properties.deckDescription.errors.join(', ')}</p>}
                </div>
                <div className="submitCon">
                    <button
                        className='btn submitButton'
                        type="submit"
                        disabled={pending}
                    >{pending ? "Updating deck..." : "Update Deck"}</button>
                    <OpenModalButton
                        modalComponent={<DeleteDeckModal deckDelete={deck} />}
                        buttonText='Delete'
                        cssClasses="btn cancelBtn rounded-md p-2"
                    />
                </div>
                {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
            </form>
        </div>
    );
}


