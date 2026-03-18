import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { algebraGrades8thGrade, creativeWritingGrades8thGrade, physicsGrades8thGrade, usHistoryGrades8thGrade } from "./data/grades-data";



const gradesData: Prisma.GradeCreateInput[] = [];

for (const course of [...algebraGrades8thGrade, ...creativeWritingGrades8thGrade, ...physicsGrades8thGrade, ...usHistoryGrades8thGrade]) {
    course.assignment_ids.forEach((assignmentId, index) => {
        for (const student of course.students) {
            gradesData.push({
                assignment: { connect: { id: assignmentId } },
                student: { connect: { id: student.id } },
                grade: student.grade[index],
            });
        }
    });
}

export async function seedGrades(prisma: PrismaClient) {
    for (const grade of gradesData) {
        await prisma.grade.create({ data: grade });
    }
}