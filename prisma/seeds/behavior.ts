import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { algebraBehavior8thGrade, creativeWritingBehavior8thGrade, physicsBehavior8thGrade, usHistoryBehavior8thGrade } from "./data/behavior-data";

const behaviorData: Prisma.BehaviorCreateInput[] = [];

for (const course of [...algebraBehavior8thGrade, ...creativeWritingBehavior8thGrade, ...physicsBehavior8thGrade, ...usHistoryBehavior8thGrade]) {
    for (const student of course.students) {
        behaviorData.push({
            student: { connect: { id: student.id } },
            course: { connect: { id: course.class_id } },
            attention: student.behavior_grades.attention,
            learnability: student.behavior_grades.learning_speed,
            cooperation: student.behavior_grades.cooperation,
        });
    };
}

export async function seedBehaviors(prisma: PrismaClient) {
    console.log('Seeding behaviors...');
    for (const behavior of behaviorData) {
        await prisma.behavior.create({ data: behavior });
    }
}