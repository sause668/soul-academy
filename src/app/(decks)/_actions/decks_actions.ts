"use server"

import { cacheTag, revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import * as z from "zod";
import { verifySession } from "@/app/lib/session";
import { ActionResponse, DeckFormSchema, DeckFormState, Deck } from "@/app/lib/definitions";

export async function refreshUserDecks() {
    try {
        const session = await verifySession();

        if (session instanceof Error) {
            throw session;
        }

        const userDecks = await getUserDecks(session.userId as string);

        return userDecks;
    }

    catch (error) {
        return error as Error;
    }
}

export async function getUserDecks(userId: string) {
    "use cache"
    cacheTag("decks");

    try {
        const userDecks: Deck[] = await prisma.deck.findMany({
            where: { userId: parseInt(userId) },
        });

        return userDecks;

    } catch (error) {
        return error as Error;
    }
}

export async function getDeck(deckId: string) {
    "use cache"
    cacheTag("deck");

    try {

        const dbDeck = await prisma.deck.findUnique({
            where: {
                id: parseInt(deckId),
            },
            include: {
                cards: true,
            },
        });

        if (!dbDeck) {
            throw new Error("Deck not found");
        }

        const deck: Deck = {
            id: dbDeck.id,
            userId: dbDeck.userId,
            name: dbDeck.name,
            description: dbDeck.description,
            cards: dbDeck.cards,
        };

        return deck;

    } catch (error) {
        return error as Error;
    }
}

export async function createDeck(deckName: string, deckDescription: string)
    : Promise<ActionResponse | DeckFormState | Error> {
    try {
        const session = await verifySession();

        if (session instanceof Error) throw session;

        const validatedFields = DeckFormSchema.safeParse({
            deckName: deckName,
            deckDescription: deckDescription,
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as DeckFormState;

        await prisma.deck.create({
            data: {
                name: validatedFields.data.deckName,
                description: validatedFields.data.deckDescription,
                userId: parseInt(session.userId as string),
            },
        });

        revalidatePath("/decks");

        return { message: "Deck created successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export async function updateDeck(deckId: string, deckName: string, deckDescription: string) {
    try {
        const session = await verifySession();

        if (session instanceof Error) throw session;

        const validatedFields = DeckFormSchema.safeParse({
            deckName: deckName,
            deckDescription: deckDescription,
        });
        
        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as DeckFormState;

        await prisma.deck.update({
            where: {
                id: parseInt(deckId),
                userId: parseInt(session.userId as string),
            },
            data: {
                name: validatedFields.data.deckName,
                description: validatedFields.data.deckDescription,
            },
        });

        revalidatePath(`/decks/${deckId}`);

        return { message: "Deck updated successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export async function deleteDeck(deckId: string) {
    try {
        const session = await verifySession();

        if (session instanceof Error) throw session;

        await prisma.deck.delete({
            where: {
                id: parseInt(deckId),
                userId: parseInt(session.userId as string),
            },
        });

        revalidatePath(`/decks`);

        return { message: "Deck deleted successfully" } as ActionResponse;
        
    } catch (error) {
        return error as Error;
    }
}

export async function addCard(deckId: string, cardName: string, cardDescription: string) {

    try {
        const dbDeck = await prisma.deck.findUnique({
            where: {
                id: parseInt(deckId),
            },
        });

        if (!dbDeck) {
            throw new Error("Deck not found");
        }

        await prisma.card.create({
            data: {
                name: cardName,
                description: cardDescription,
                deckId: parseInt(deckId),
            },
        });

        revalidatePath(`/decks/${deckId}`);

        return { success: true };


    } catch (error) {
        return error as Error;
    }
}

export async function deleteCard(cardId: string) {
    try {
        const dbCard = await prisma.card.findUnique({
            where: {
                id: parseInt(cardId),
            },
        });

        if (!dbCard) {
            throw new Error("Card not found");
        }
        await prisma.card.delete({
            where: {
                id: parseInt(cardId),
            },
        });

        revalidatePath(`/decks/${dbCard.deckId}`);

        return { success: true };
    } catch (error) {
        return error as Error;
    }
}