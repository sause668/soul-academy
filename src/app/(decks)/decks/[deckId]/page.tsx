import { getDeck } from "@/app/(decks)/_actions/decks_actions";
import { notFound } from "next/navigation";
import DeckComponent from "@/app/(decks)/_components/Deck/Deck";
import { getSession } from "@/app/(_home)/_actions/user-actions";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";

export default async function DeckPage({ params }: { params: Promise<{ deckId: string }>  }) {
    const { deckId } = await params;
    const deck = await getDeck(deckId);
    const session = await getSession();

    if (deck instanceof Error) {
        if (deck.message === "Deck not found") notFound();
        else return <ErrorPage />
    } 

    const editable = !(session instanceof Error) && parseInt(session.userId as string) === deck.userId;

    return (
        <div>
            <DeckComponent deck={deck} editable={editable} />
        </div>
    );
}