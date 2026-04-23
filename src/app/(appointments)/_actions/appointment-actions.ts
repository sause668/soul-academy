'use server'

import * as z from 'zod';
import prisma from "@/lib/prisma";
import { Appointment, Course, SessionPayload, Teacher, Student, AppointmentsData, User, AppointmentFormState, AppointmentFormSchema, ActionResponse } from "@/app/lib/definitions";
import { verifySession } from "@/app/lib/session";
import { revalidatePath } from 'next/cache';
import { cache } from 'react';

export async function getAppointments(session: SessionPayload) {
    const { userId, userRoleId, userRole } = session;

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                OR: [
                    { teacherId: parseInt(userRole === 'teacher' ? userRoleId : '0') },
                    { studentId: parseInt(userRole === 'student' ? userRoleId : '0') },
                ],
            },
            include: {
                teacher: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
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
                course: {
                    select: {
                        id: true,
                        name: true,
                        subject: true,
                        grade: true,
                        room: true,
                        period: true,
                    },
                },
            },
        });

        const safeUser: User = {
            id: parseInt(userId),
            role: userRole,
            teacher: {
                id: parseInt(userRole === 'teacher' ? userRoleId : '0'),
            },
            student: {
                id: parseInt(userRole === 'student' ? userRoleId : '0'),
            },
        };

        const safeAppointments: Appointment[] = [];
        for (const appointment of appointments) {
            const safeTeacher: Teacher = {
                id: appointment.teacher?.id,
                firstName: appointment.teacher?.user?.firstName,
                lastName: appointment.teacher?.user?.lastName,
            };

            const safeStudent: Student = {
                id: appointment.student?.id,
                firstName: appointment.student?.user?.firstName,
                lastName: appointment.student?.user?.lastName,
            };

            const safeCourse: Course = {
                id: appointment.course?.id,
                name: appointment.course?.name,
                subject: appointment.course?.subject,
                grade: appointment.course?.grade,
                room: appointment.course?.room,
                period: appointment.course?.period,
            };

            safeAppointments.push({
                id: appointment.id,
                teacher: safeTeacher,
                student: safeStudent,
                course: safeCourse,
                name: appointment.name,
                description: appointment.description || undefined,
                startTime: appointment.startTime,
                endTime: appointment.endTime,
            });
        }

        const safeAppointmentsData: AppointmentsData = {
            user: safeUser,
            appointments: safeAppointments,
        };
        return safeAppointmentsData;
    } catch (error) {
        return error as Error;
    }
}

export async function createAppointment(teacherId: number, studentId: number, courseId: number, name: string, description: string, startTime: Date, endTime: Date) {
    try {
        if (teacherId <= 0 || studentId <= 0 || courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as AppointmentFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        if (session.userRole === 'student') throw new Error('Unauthorized');

        const validatedFields = AppointmentFormSchema.safeParse({
            teacherId,
            studentId,
            courseId,
            name,
            description,
            startTime,
            endTime,
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as AppointmentFormState;

        await prisma.appointment.create({
            data: {
                teacherId: validatedFields.data.teacherId,
                studentId: validatedFields.data.studentId,
                courseId: courseId,
                name: name,
                description: description,
                startTime: startTime,
                endTime: endTime,
            },
        });

        revalidatePath(`/appointments`);

        return { message: "Appointment created successfully" } as ActionResponse;
    } catch (error) {
        return error as Error;
    }
}

export async function updateAppointment(appointmentId: number, teacherId: number, studentId: number, courseId: number, name: string, description: string, startTime: Date, endTime: Date) {
    try {
        if (appointmentId <= 0 || teacherId <= 0 || studentId <= 0 || courseId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as AppointmentFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;

        if (session.userRole === 'student') throw new Error('Unauthorized');

        const validatedFields = AppointmentFormSchema.safeParse({
            teacherId,
            studentId,
            courseId,
            name,
            description,
            startTime,
            endTime,
        });

        if (!validatedFields.success) return z.treeifyError(validatedFields.error) as AppointmentFormState;


        await prisma.appointment.update({
            where: { id: appointmentId },
            data: {
                teacherId: validatedFields.data.teacherId,
                studentId: validatedFields.data.studentId,
                courseId: courseId,
                name: name,
                description: description,
                startTime: startTime,
                endTime: endTime,
            },
        });

        revalidatePath(`/appointments`);

        return { message: "Appointment updated successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export async function deleteAppointment(appointmentId: number) {
    try {
        if (appointmentId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as AppointmentFormState;

        const session = await verifySession();

        if (session instanceof Error) throw session;
        
        if (session.userRole === 'student') throw new Error('Unauthorized');

        await prisma.appointment.delete({
            where: { id: appointmentId },
        });

        revalidatePath(`/appointments`);

        return { message: "Appointment deleted successfully" } as ActionResponse;

    } catch (error) {
        return error as Error;
    }
}

export async function getAppCourses(teacherId: number) {
    try {
        if (teacherId <= 0) return { errors: ['Key Information not found.  Refreshing the page may fix this issue.'] } as AppointmentFormState;

        const courses = await prisma.course.findMany({
            where: { teacherId: teacherId },
            select: {
                id: true,
                name: true,
                subject: true,
                grade: true,
                room: true,
                period: true,
            },
        });

        const safeCourses: Course[] = [];
        for (const course of courses) {
            safeCourses.push({
                id: course.id,
                name: course.name,
                subject: course.subject,
                grade: course.grade,
                room: course.room,
                period: course.period,
            });
        }

        return safeCourses;
    } catch (error) {
        return error as Error;
    }
};