import { JWTPayload } from "jose";
import * as z from 'zod'

// Session Definitions
export interface SessionPayload extends JWTPayload {
    userId: string;
    expiresAt: Date;
}

export interface ActionResponse {
    message?: string;
}

// User Definitions
export interface User {
    id?: number | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
}

//Login Form Definitions
export const LoginFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        // .min(8, { error: 'Be at least 8 characters long' })
        // .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        // .regex(/[0-9]/, { error: 'Contain at least one number.' })
        // .regex(/[^a-zA-Z0-9]/, {
        //     error: 'Contain at least one special character.',
        // })
        .trim(),
})

export type LoginFormState = {
    errors: string[],
    properties?: {
        email?: { errors: string[] } | undefined;
        password?: { errors: string[] } | undefined;
    } | undefined
} | undefined

// Signup Form Definitions
export const SignupFormSchema = z
    .object({
        firstName: z.string().min(1, { error: 'First Name is required' }).trim(),
        lastName: z.string().min(1, { error: 'Last Name is required' }).trim(),
        username: z.string().min(1, { error: 'Username is required' }).trim(),
        email: z.email({ error: 'Please enter a valid email.' }).trim(),
        password: z
            .string()
            .min(8, { error: 'Password must be at least 8 characters long' })
            .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
            .regex(/[0-9]/, { error: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, { error: 'Contain at least one special character.', })
            .trim(),
        confirmPassword: z.string().trim()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"]

    })

export type SignupFormState = {
    errors: string[],
    properties?: {
        firstName?: { errors: string[] } | undefined;
        lastName?: { errors: string[] } | undefined;
        username?: { errors: string[] } | undefined;
        email?: { errors: string[] } | undefined;
        password?: { errors: string[] } | undefined;
        confirmPassword?: { errors: string[] } | undefined;
    } | undefined
} | undefined


//Deck Definitions
export interface Deck {
    id: number;
    userId: number;
    name: string;
    description: string;
    cards?: Card[];
    updatedAt?: Date;
    createdAt?: Date;
}

export interface Card {
    id: number;
    name: string;
    description: string;
}

export type DeckData = Promise<Deck | Error> | Error;

//Deck Form Definitions
export const DeckFormSchema = z.object({
    deckName: z
        .string()
        .min(1, { error: 'Deck Name is required' })
        .trim(),
    deckDescription: z
        .string()
        .min(1, { error: 'Deck Description is required' })
        .trim(),
})

export type DeckFormState = {
    errors: string[],
    properties?: {
        deckName?: { errors: string[] } | undefined;
        deckDescription?: { errors: string[] } | undefined;
    } | undefined
} | undefined



