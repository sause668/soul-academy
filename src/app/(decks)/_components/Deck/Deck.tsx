"use client";
import Link from "next/link";
import { useState } from "react";
import "./Deck.css";
import { Deck, Card } from "@/app/lib/definitions";
import { addCard, deleteCard } from "@/app/(decks)/_actions/decks_actions";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import EditDeckModal from "@/app/(decks)/_components/Deck/EditDeckModal";
import { IoClose } from "react-icons/io5";
// import { revalidatePath } from "next/cache";

export default function DeckComponent({ deck, editable }: { deck: Deck, editable: boolean }) {
    const [cardName, setCardName] = useState("");
    const [cardDescription, setCardDescription] = useState("");
    const router = useRouter();

    const handleAddCard = async () => {
        const card = await addCard(deck.id.toString(), cardName, cardDescription);

        if (card instanceof Error) {
            console.error(card.message);
        }
    }

    const handleDeleteCard = async (cardId: string) => {
        const card = await deleteCard(cardId);

        if (card instanceof Error) {
            console.error(card.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-start gap-4 bg-screenWhite dark:bg-screenBlack min-h-screen pt-16">
            <Link href="/decks" className="text-sm text-gray-500 hover:text-primary transition-all duration-300">Back</Link>
            <div className="flex flex-col gap-2  border border-black dark:border-white rounded-md p-4">
                <div className="flex justify-between items-center gap-6 mb-3">
                    <h1 className="text-3xl font-bold">{deck.name}</h1>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">{deck.description}</p>
                        {editable && (
                        <OpenModalButton
                            modalComponent={<EditDeckModal deck={deck} />}
                                buttonText={<MdEdit />}
                                cssClasses="btn rounded-md p-2"
                            />
                        )}
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                    {deck.cards && deck.cards.map((card: Card) => (
                        <div className="flex flex-col gap-2 bg-screenWhite dark:bg-screenBlack border border-screenBlack dark:border-screenWhite rounded-md p-3 max-w-40" key={card.id}>
                            <div className="flex justify-start items-start gap-2">
                                {editable && (
                                    <button
                                        className="text-sm text-gray-500 cursor-pointer hover:text-primary transition-all duration-300"
                                        onClick={() => handleDeleteCard(card.id.toString())}
                                    ><IoClose /></button>
                                )}
                                <h3 className="text-lg font-bold">{card.name}</h3>
                            </div>
                            <p className="text-sm text-gray-500">{card.description}</p>
                        </div>
                    ))}
                    {editable && (
                        <div className="flex flex-col gap-2 bg-screenWhite dark:bg-screenBlack border border-screenBlack dark:border-white rounded-md p-3 max-w-40">
                            <h3 className="text-lg font-bold text-screenBlack dark:text-screenWhite">Add Card</h3>
                            <input
                                type="text"
                                placeholder="Card Name"
                                className="text-sm text-gray-500"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Card Description"
                                className="text-sm text-gray-500"
                                value={cardDescription}
                                onChange={(e) => setCardDescription(e.target.value)}
                                required
                            />
                            <button
                                className="btn"
                                onClick={handleAddCard}
                                disabled={!cardName || !cardDescription}
                            >Add Card</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}