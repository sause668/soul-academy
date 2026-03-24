'use server';
import * as z from 'zod';
import { GroupFormState, GroupFormSchema, ActionResponse } from "@/app/lib/definitions";
import { verifySession } from "@/app/lib/session";
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createGroup = async (courseId: number, name: string) => {
    try {
        if (courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as GroupFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        const validatedFields = GroupFormSchema.safeParse({
            name,
        });
        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as GroupFormState;

        await prisma.group.create({
            data: {
                courseId,
                name: validatedFields.data.name,
            }
        });

        revalidatePath(`/classes/${courseId}`);

        return { message: 'Group created successfully' } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export const updateGroup = async (groupId: number, name: string, courseId: number) => {
    try {
        if (groupId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as GroupFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        const validatedFields = GroupFormSchema.safeParse({
            name,
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as GroupFormState;

        await prisma.group.update({
            where: { id: groupId },
            data: {
                name: validatedFields.data.name,
            },
        });

        revalidatePath(`/classes/${courseId}`);

        return { message: 'Group updated successfully' } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export const deleteGroup = async (groupId: number, courseId: number) => {
    try {
        if (groupId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as GroupFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        await prisma.group.delete({
            where: { id: groupId },
        });

        revalidatePath(`/classes/${courseId}`);

        return { message: 'Group deleted successfully' } as ActionResponse;
    } catch (error) {
        return error as Error;
    }
}

export const addGroupStudent = async (groupIdAdd: number, studentId: number, courseId: number) => {
    try {
        if (groupIdAdd <= 0 || studentId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as GroupFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        await prisma.group.update({
            where: { id: groupIdAdd },
            data: {
                students: { connect: { id: studentId } },
            },
        });

        revalidatePath(`/classes/${courseId}`);

        return { message: 'Student added to group successfully' } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export const editGroupStudent = async (groupIdRemove: number, groupIdAdd: number, studentId: number, courseId: number) => {
    try {
        if (groupIdRemove <= 0 || groupIdAdd <= 0 || studentId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as GroupFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        await prisma.group.update({
            where: { id: groupIdRemove },
            data: {
                students: { disconnect: { id: studentId } },
            },
        });

        await prisma.group.update({
            where: { id: groupIdAdd },
            data: {
                students: { connect: { id: studentId } },
            },
        });

        revalidatePath(`/classes/${courseId}`);

        return { message: 'Student edited in group successfully' } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export const removeGroupStudent = async (groupIdRemove: number, studentId: number, courseId: number) => {
    try {
        if (groupIdRemove <= 0 || studentId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as GroupFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        await prisma.group.update({
            where: { id: groupIdRemove },
            data: {
                students: { disconnect: { id: studentId } },
            },
        });

        revalidatePath(`/classes/${courseId}`);

        return { message: 'Student removed from group successfully' } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}