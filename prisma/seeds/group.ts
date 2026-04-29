import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { algebraGroup8thGrade, creativeWritingGroup8thGrade, physicsGroup8thGrade, usHistoryGroup8thGrade } from "./data/group-data";

const groupData: Prisma.GroupCreateInput[] = [];

for (const course of [...algebraGroup8thGrade, ...creativeWritingGroup8thGrade, ...physicsGroup8thGrade, ...usHistoryGroup8thGrade]) {
    course.groups.forEach((group, index) => {
        groupData.push({
            course: { connect: { id: course.courseId } },
            name: `Group ${index + 1}`,
            students: { connect: group.studentIds.map((studentId: number) => ({ id: studentId })) },
        });
    });
}

export async function seedGroups(prisma: PrismaClient) {
    console.log('Seeding groups...');
    for (const group of groupData) {
        await prisma.group.create({ data: group });
    }
}