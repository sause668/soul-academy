'use server'

import { ActionResponse, AnnouncementFormSchema, AnnouncementFormState } from "@/app/lib/definitions";
import { verifySession } from "@/app/lib/session";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import * as z from 'zod';

export async function createAnnouncement(userId: number, title: string, content: string, imageUrl: string, scope: string) {
    try {
        if (userId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as AnnouncementFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        if (session.userId !== userId.toString() || session.userRole !== 'teacher') throw new Error('Unauthorized');

        const validatedFields = AnnouncementFormSchema.safeParse({
            title,
            content,
            imageUrl,
            scope,
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as AnnouncementFormState;

        await prisma.announcement.create({
            data: {
                userId,
                title: validatedFields.data.title,
                content: validatedFields.data.content,
                imageUrl,
                scope,
            },
        });

        revalidatePath(`/`);

        return { message: "Announcement created successfully" } as ActionResponse;
    } catch (error) {
        return error as Error;
    }

}

export async function updateAnnouncement(announcementId: number, userId: number, title: string, content: string, imageUrl: string, scope: string) {
    try {
        if (announcementId <= 0 || userId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as AnnouncementFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        if (session.userId !== userId.toString() || session.userRole !== 'teacher') throw new Error('Unauthorized');

        const validatedFields = AnnouncementFormSchema.safeParse({
            title,
            content,
            imageUrl,
            scope,
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as AnnouncementFormState;

        await prisma.announcement.update({
            where: { id: announcementId },
            data: {
                title: validatedFields.data.title,
                content: validatedFields.data.content,
                imageUrl,
                scope,
            },
        });

        revalidatePath(`/`);

        return { message: "Announcement updated successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export async function deleteAnnouncement(announcementId: number, userId: number) {
    try {
        if (announcementId <= 0 || userId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as AnnouncementFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        if (session.userId !== userId.toString() || session.userRole !== 'teacher') throw new Error('Unauthorized');

        await prisma.announcement.delete({
            where: { id: announcementId },
        });

        revalidatePath(`/`);

        return { message: "Announcement deleted successfully" } as ActionResponse;
    }

    catch (error) {
        return error as Error;
    }
}
