"use server";
import * as z from 'zod';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { verifySession } from "@/app/lib/session";
import { ActionResponse, AssignmentFormSchema, AssignmentFormState } from "@/app/lib/definitions";

export async function createAssignment(courseId: number, name: string, type: string, quarter: number, dueDate: string) {
    try {
        if (courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as AssignmentFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        const validatedFields = AssignmentFormSchema.safeParse({
            name,
            type,
            dueDate: new Date(dueDate),
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as AssignmentFormState;

        await prisma.assignment.create({
            data: {
                courseId,
                name: validatedFields.data.name,
                type: validatedFields.data.type,
                quarter,
                dueDate: validatedFields.data.dueDate,
            },
        });

        revalidatePath(`/courses/${courseId}`);

        return { message: "Assignment created successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export async function updateAssignment(assignmentId: number, courseId: number, name: string, type: string, quarter: number, dueDate: string) {
    try {
        if (courseId <= 0 || assignmentId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as AssignmentFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        const validatedFields = AssignmentFormSchema.safeParse({
            name,
            type,
            dueDate: new Date(dueDate),
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as AssignmentFormState;

        await prisma.assignment.update({
            where: { id: assignmentId },
            data: {
                courseId,
                name: validatedFields.data.name,
                type: validatedFields.data.type,
                quarter,
                dueDate: validatedFields.data.dueDate,
            },
        });

        revalidatePath(`/courses/${courseId}`);

        return { message: "Assignment updated successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export async function deleteAssignment(assignmentId: number, courseId: number) {
    try {
        if (courseId <= 0 || assignmentId <= 0) throw new Error('Key Information not found.  Refreshing the page may fix this issue.');

        const session = await verifySession();

        if (session instanceof Error) throw session;

        await prisma.assignment.delete({
            where: { id: assignmentId },
        });

        revalidatePath(`/courses/${courseId}`);

        return { message: "Assignment deleted successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}