"use client";

import { useRouter } from "next/navigation";
import { Deck } from "@/app/lib/definitions";
import { FaPlus } from "react-icons/fa6";
import "./Decks.css";

export default function Decks({ decks }: { decks: Deck[] }) {
    const router = useRouter();

    return (
        <div id="mainConDecks" className="flex flex-col items-center justify-start gap-4 bg-screenWhite dark:bg-screenBlack min-h-screen pt-16">
            <div id="titleConDecks" className="flex items-center justify-start gap-4">
                <h1 id="titleDecks" className="text-3xl font-title font-bold border-b border-black dark:border-white">Decks</h1>
                <button
                    id="addDeckBtn"
                    className="btn rounded-full p-2"
                    onClick={() => router.push('/decks/new')}
                >
                    <FaPlus />
                </button>
            </div>
            <div className="flex flex-col gap-4 ">
                {decks.map((deck: Deck) => (
                    <div
                        onClick={() => router.push(`/decks/${deck.id}`)}
                        className="flex flex-col gap-2 p-3 border bg-screenWhite dark:bg-screenBlack border-black dark:border-white rounded-md cursor-pointer hover:bg-primary hover:border-primary hover:text-screenWhite  transition-all duration-300" key={deck.id}>
                        <div className="flex justify-between items-center gap-6">
                            <h2 className="text-2xl font-bold">{deck.name}</h2>
                            <p className="text-sm text-gray-500">{deck.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}