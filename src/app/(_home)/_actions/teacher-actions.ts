'use server'

import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";

export async function getTeacherDashboardData(userId: string) {
    try {
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            include: {
                teacher: {
                    include: {
                        courses: {
                            include: {
                            },
                        },
                        appointments: {
                            include: {
                                student: {
                                    include: {
                                        user: {
                                            select: {
                                                firstName: true,
                                                lastName: true,
                                            },
                                        },
                                    },
                                },
                                course: true,
                            },
                        },
                    },
                },
            },
        });

        if (!userData) {
            throw new Error("User not found");
        }

        const teacherDashboardData: TeacherDashboardData = {
            user: userData.user,
            courses: userData.teacher.courses,
            appointments: userData.teacher.appointments,
        };

        return userData;
    } catch (error) {
        return error as Error;
    }
}