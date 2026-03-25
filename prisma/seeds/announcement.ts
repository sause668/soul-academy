import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { announcements } from "./data/announcement-data";

const announcementData: Prisma.AnnouncementCreateInput[] = [];

for (const announcement of announcements) {
    announcementData.push({
        user: { connect: { id: announcement.userId } },
        title: announcement.title,
        content: announcement.content,
        scope: announcement.scope,
        createdAt: new Date(announcement.createdAt),
    });
}

export async function seedAnnouncements(prisma: PrismaClient) {
    console.log('Seeding announcements...');
    for (const announcement of announcementData) {
        await prisma.announcement.create({ data: announcement });
    }
}