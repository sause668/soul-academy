import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { courses8thGrade } from "./data/course-data";



const courseData: Prisma.CourseCreateInput[] = [];
for (const subject of courses8thGrade.subjects) {
    for (const course of subject.courses) {
        const assignmentData = [];
        for (const quarter of subject.quarters) {
            for (const assignment of quarter.assignments) {
                assignmentData.push({
                    name: assignment.name,
                    type: assignment.type,
                    quarter: quarter.quarter,
                    dueDate: new Date(assignment.dueDate),
                })
            }
        }
        courseData.push({
            name: subject.name,
            subject: subject.subject,
            grade: courses8thGrade.grade,
            room: course.room,
            period: course.period,
            teacher: { connect: { id: subject.teacherId } },
            students: { connect: course.studentIds.map((studentId: number) => ({ id: studentId })) },
            assignments: {
                create: assignmentData,
            },
        })
    }
}
// courses8thGrade.subjects.map(subject => {
//     return subject.courses.map(course => {
//         return {
//             name: subject.name,
//             subject: subject.subject,
//             grade: courses8thGrade.grade,
//             room: course.room,
//             period: course.period,
//             teacher: { connect: { id: subject.teacherId } },
//             students: { connect: course.studentIds.map((studentId: number) => ({ id: studentId })) },
//             assignments: {
//                 create: subject.quarters.map(quarter => {
//                     return quarter.assignments.map(assignment => ({
//                         name: assignment.name,
//                         type: assignment.type,
//                         quarter: quarter.quarter,
//                         dueDate: new Date(assignment.dueDate),
//                     }
//                     ))
//                 })
//             },
//         }
//     })
// });

export async function seedCourses(prisma: PrismaClient) {
    for (const course of courseData) {
        await prisma.course.create({ data: course });
    }
}