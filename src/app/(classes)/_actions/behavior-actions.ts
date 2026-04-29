'use server';

import prisma from '@/lib/prisma';
import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { verifySession } from '@/app/lib/session';
import { BehaviorFormState, BehaviorFormSchema, ActionResponse } from '@/app/lib/definitions';

export async function createBehavior(studentId: number, courseId: number, attention: number | undefined, learnability: number | undefined, cooperation: number | undefined) {
    console.log('bah');
    try {
        console.log('createBehavior: ', studentId, courseId, attention, learnability, cooperation);
        if (studentId <= 0 || courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as BehaviorFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        const validatedFields = BehaviorFormSchema.safeParse({
            attention,
            learnability,
            cooperation,
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as BehaviorFormState;

        await prisma.behavior.create({
            data: {
                studentId,
                courseId,
                attention: validatedFields.data.attention ?? undefined,
                learnability: validatedFields.data.learnability ?? undefined,
                cooperation: validatedFields.data.cooperation ?? undefined,
            },
        });

        revalidatePath(`/courses/${courseId}`);

        return { message: "Behavior created successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export async function updateBehavior(behaviorId: number, courseId: number, attention: number | undefined, learnability: number | undefined, cooperation: number | undefined) {
    try {
        if (behaviorId <= 0 || courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as BehaviorFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;


        const validatedFields = BehaviorFormSchema.safeParse({
            attention,
            learnability,
            cooperation,
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as BehaviorFormState;

        await prisma.behavior.update({
            where: { id: behaviorId },
            data: {
                attention: validatedFields.data.attention ?? undefined,
                learnability: validatedFields.data.learnability ?? undefined,
                cooperation: validatedFields.data.cooperation ?? undefined,
            },
        });

        revalidatePath(`/courses/${courseId}`);

        return { message: "Behavior updated successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export async function deleteBehavior(behaviorId: number, courseId: number) {
    try {
        if (behaviorId <= 0 || courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as BehaviorFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        await prisma.behavior.delete({
            where: { id: behaviorId },
        });

        revalidatePath(`/courses/${courseId}`);

        return { message: "Behavior deleted successfully" } as ActionResponse;
    } catch (error) {
        return error as Error;
    }
}