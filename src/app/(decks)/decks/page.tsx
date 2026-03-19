import Decks from "@/app/(decks)/_components/Decks/Decks";
import { refreshUserDecks } from "@/app/(decks)/_actions/decks_actions";
import ErrorPage from "@/app/(_home)/_components/ErrorPage/ErrorPage";

export default async function DecksPage() {
    return <div>Decks</div>;
    // const decksData = await refreshUserDecks();

    // if (decksData instanceof Error) return <ErrorPage />

    // return <Decks decks={decksData} />;
}