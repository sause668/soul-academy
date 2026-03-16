"use client";

import { useState, useTransition } from "react";
import { DeckFormState } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import "./CreateDeckForm.css";
import { createDeck } from "@/app/(decks)/_actions/decks_actions";

export default function CreateDeckForm() {
    const router = useRouter();
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");
    const [errors, setErrors] = useState<DeckFormState>(undefined);
    const [pending, startTransition] = useTransition();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            const result = await createDeck(deckName, deckDescription);

            if (result instanceof Error) setErrors({ errors: ['Failed to create deck. Please try again.'] } as DeckFormState);
            else if (result && "errors" in result) setErrors(result);
            else router.push('/decks');
        });

    };

    return (
        <div className="flex justify-center items-center pt-10">
            <div className="flex flex-col items-start justify-center gap-2 bg-screenWhite border border-primary text-screenBlack rounded-md ">
                <div className='formCon'>
                    <h1 className='inputTitle'>New Deck</h1>
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
                            >{pending ? "Creating deck..." : "Create Deck"}</button>
                        </div>
                        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}


