import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import bcrypt from "bcryptjs";
import { admins, teachers8thGrade, students8thGrade } from "./data/user-data";



const adminData: Prisma.UserCreateInput[] = admins.admins.map(admin => ({
    firstName: admin.firstName,
    lastName: admin.lastName,
    username: admin.username,
    email: admin.email,
    hashedPassword: bcrypt.hashSync(admins.password, 10),
    role: admins.role,
    admin: {
        create: {
            title: admin.title,
        }
    }
}));

const teacherData: Prisma.UserCreateInput[] = teachers8thGrade.teachers.map(teacher => ({
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    username: teacher.username,
    email: teacher.email,
    hashedPassword: bcrypt.hashSync(teachers8thGrade.password, 10),
    role: teachers8thGrade.role,
    teacher: {
        create: {
            primaryGrade: teachers8thGrade.primaryGrade,
            primarySubject: teacher.primarySubject,
        }
    }
}));

const studentData: Prisma.UserCreateInput[] = students8thGrade.students.map(student => ({
    firstName: student.firstName,
    lastName: student.lastName,
    username: student.username,
    email: student.email,
    hashedPassword: bcrypt.hashSync(students8thGrade.password, 10),
    role: students8thGrade.role,
    student: {
        create: {
            currentGrade: students8thGrade.currentGrade,
        }
    }
}));

export async function seedUsers(prisma: PrismaClient) {
    console.log('Seeding users...');
    for (const teacher of teacherData) {
        await prisma.user.create({ data: teacher });
    }
    for (const student of studentData) {
        await prisma.user.create({ data: student });
    }
    for (const admin of adminData) {
        await prisma.user.create({ data: admin });
    }
}

