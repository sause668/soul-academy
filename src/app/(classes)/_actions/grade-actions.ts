'use server';

import * as z from 'zod';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { verifySession } from "@/app/lib/session";
import { ActionResponse, GradeFormSchema, GradeFormState } from "@/app/lib/definitions";

export const createGrade = async (assignmentId: number, studentId: number, grade: number, courseId: number) => {
    try {
        if (assignmentId <= 0 || studentId <= 0 || courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as GradeFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        const validatedFields = GradeFormSchema.safeParse({
            grade,
        });
        
        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as GradeFormState;

        await prisma.grade.create({
            data: {
                assignmentId,
                studentId,
                grade: validatedFields.data.grade,
            },
        });

        revalidatePath(`/classes/${courseId}`);

        return { message: "Grade created successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export const updateGrade = async (assignmentId: number, studentId: number, grade: number, courseId: number) => {
    try {
        console.log('updateGrade', assignmentId, studentId, grade, courseId);
        if (assignmentId <= 0 || studentId <= 0 || courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as GradeFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        const validatedFields = GradeFormSchema.safeParse({
            grade,
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as GradeFormState;

        await prisma.grade.update({
            where: { assignmentId_studentId: { assignmentId, studentId } },
            data: { grade: validatedFields.data.grade },
        });

        revalidatePath(`/classes/${courseId}`);

        return { message: "Grade updated successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export const deleteGrade = async (assignmentId: number, studentId: number, courseId: number) => {
    try {
        if (assignmentId <= 0 || studentId <= 0 || courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as GradeFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        await prisma.grade.delete({
            where: { assignmentId_studentId: { assignmentId, studentId } },
        });

        revalidatePath(`/classes/${courseId}`);

        return { message: "Grade deleted successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}