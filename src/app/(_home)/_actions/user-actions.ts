"use server";

import * as z from 'zod'
import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { createSession, verifySession, deleteSession } from "@/app/lib/session";
import { ActionResponse, LoginFormState, LoginFormSchema, SignupFormSchema, SignupFormState, User } from "@/app/lib/definitions";

export async function getSession() {
    try {
        const session = await verifySession();

        if (session instanceof Error) throw session;

        return session;
    }
    catch (error) {
        return error as Error;
    }
}

export async function getUser() {

    try {
        const session = await verifySession();

        if (session instanceof Error) throw session;

        const user = await getUserById(session.userId as string);

        if (user instanceof Error) throw user;

        return user;

    } catch (error) {
        return error as Error;
    }
}

export async function getUserById(userId: string) {
    "use cache"
    cacheTag("user");

    try {
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;

    } catch (error) {
        return error as Error;
    }
}

export async function getUserByEmail(email: string) {
    "use cache"
    cacheTag("user");

    try {
        const user: User | null = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                teacher: true,
                student: true,
                admin: true,
            },
            // select: {
            //     id: true,
            //     firstName: true,
            //     lastName: true,
            //     username: true,
            //     email: true,
            // },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;

    } catch (error) {
        return error as Error;
    }
}

// export async function signupUser(firstName: string, lastName: string, username: string, email: string, password: string, confirmPassword: string) {

//     try {
//         const validatedFields = SignupFormSchema.safeParse({
//             firstName: firstName,
//             lastName: lastName,
//             username: username,
//             email: email,
//             password: password,
//             confirmPassword: confirmPassword,
//         })

//         if (!validatedFields.success) {
//             return z.treeifyError(validatedFields.error) as SignupFormState;
//         }

//         const userData = await prisma.user.findUnique({
//             where: { email: validatedFields.data.email },
//             select: { id: true },
//         });

//         if (userData) {
//             throw new Error("User already exists");
//         }

//         const passwordHash = await bcrypt.hash(validatedFields.data.password, 10);

//         await prisma.user.create({
//             data: { 
//                 firstName: validatedFields.data.firstName, 
//                 lastName: validatedFields.data.lastName, 
//                 username: validatedFields.data.username, 
//                 email: validatedFields.data.email, 
//                 password: passwordHash },
//         });

//         const newUser = await getUserByEmail(validatedFields.data.email);

//         if (newUser instanceof Error) {
//             throw newUser;
//         }

//         if (!newUser.id) {
//             throw new Error("User ID not found");
//         }

//         await createSession(newUser.id.toString());

//         return {message: "Signup successful"} as ActionResponse;

//     } catch (error) {
//         return {errors: [(error as Error).message]} as SignupFormState;
//     }
// }

export async function loginUser(email: string, password: string) {

    try {
        const validatedFields = LoginFormSchema.safeParse({
            email: email,
            password: password,
        })

        

        if (!validatedFields.success) {
            return z.treeifyError(validatedFields.error) as LoginFormState;
        }

        
        const userData = await prisma.user.findUnique({
            where: { email: validatedFields.data.email },
        });
        
        if (!userData) {
            throw new Error("User not found");
        }


        
        if (!bcrypt.compareSync(validatedFields.data.password, userData.hashedPassword)) {
            throw new Error("Invalid password");
        }

        await createSession(userData.id.toString());
        
        return { message: "Login successful"} as ActionResponse;
    }
    catch (error) {
        return error as Error;
    }
}

export async function sessionUser(userId: string) {

    try {
        await createSession(userId);
    }
    catch (error) {
        return error as Error;
    }
}

export async function logoutUser() {

    try {
        await deleteSession();
    }
    catch (error) {
        return error as Error;
    }
}


// export async function updateUser(id: string, firstName: string, lastName: string, username: string, email: string, password: string) {

//     try {
//         const user = await prisma.user.update({
//             where: { id: parseInt(id) },
//             data: { firstName, lastName, username, email, password },
//         });
//     } catch (error) {
//         return error as Error;
//     }
// }

// export async function deleteUser(id: string) {

//     try {
//         const user = await prisma.user.delete({
//             where: { id: parseInt(id) },
//         });
//     } catch (error) {
//         return error as Error;
//     }
// }




