import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { families } from "./data/family-data";

const familyData: Prisma.FamilyCreateInput[] = families.map(family => ({
    familyName: family.familyName,
    siblings: {
        connect: family.siblings.map(sibling => ({
            id: sibling.studentId,
        })),
    },
}));

export async function seedFamilies(prisma: PrismaClient) {
    for (const family of familyData) {
        const newFamily = await prisma.family.create({ data: family });
        for (const sibling of families[newFamily.id-1].siblings) {
            await prisma.student.update({
                where: { id: sibling.studentId },
                data: { familyId: newFamily.id },
            });
        }
    }
}