'use server'

import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { Appointment, Behavior, Course, Teacher, TeacherDashboardData, Student, Announcement } from "@/app/lib/definitions";

export async function getTeacherDashboardData(userId: string) {
    try {
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            omit: {
                hashedPassword: true,
                createdAt: true,
                updatedAt: true,
            },
            include: {
                teacher: {
                    omit: {
                        userId: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    include: {
                        courses: {
                            omit: {
                                teacherId: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                            include: {
                                _count: {
                                    select: { students: true },
                                },
                                behaviors: {
                                    omit: {
                                        courseId: true,
                                        notes: true,
                                        createdAt: true,
                                        updatedAt: true,
                                    },
                                    include: {
                                        student: {
                                            omit: {
                                                userId: true,
                                                familyId: true,
                                                createdAt: true,
                                                updatedAt: true,
                                                currentGrade: true,
                                            },
                                            include: {
                                                user: {
                                                    select: {
                                                        firstName: true,
                                                        lastName: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
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
                                                role: true,
                                            },
                                        },
                                    },
                                },
                                course: {
                                    omit: {
                                        teacherId: true,
                                        room: true,
                                        period: true,
                                        createdAt: true,
                                        updatedAt: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!userData) {
            throw new Error("User not found");
        }

        const announcementsData = await prisma.announcement.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            omit: {
                updatedAt: true,
            },
            include: {
                user: {
                    omit: {
                        email: true,
                        username: true,
                        hashedPassword: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    include: {
                        admin: { select: { title: true } },
                    }
                },
            },
            // take: 5,
        });

        const safeTeacher: Teacher = {
            id: userData.teacher?.id,
            userId: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            primaryGrade: userData.teacher?.primaryGrade,
            primarySubject: userData.teacher?.primarySubject
        };

        const safeAppointments: Appointment[] = [];
        if (userData.teacher?.appointments) {
            for (const appointment of userData.teacher.appointments) {
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
                };
                safeAppointments.push({
                    id: appointment.id,
                    studentId: appointment.student?.id,
                    courseId: appointment.course?.id,
                    name: appointment.name,
                    description: appointment.description || undefined,
                    startTime: appointment.startTime,
                    endTime: appointment.endTime,
                    teacherId: appointment.teacherId,
                    student: safeStudent,
                    course: safeCourse,
                });
            }
        }

        const safeBehaviors: Behavior[] = [];
        if (userData.teacher?.courses) {
            for (const course of userData.teacher.courses) {
                for (const behavior of course.behaviors) {
                    const safeStudent: Student = {
                        id: behavior.student?.id,
                        firstName: behavior.student?.user?.firstName,
                        lastName: behavior.student?.user?.lastName,
                    };
                    safeBehaviors.push({
                        id: behavior.id,
                        studentId: behavior.studentId,
                        attention: behavior.attention,
                        learnability: behavior.learnability,
                        cooperation: behavior.cooperation,
                        student: safeStudent,
                    });
                }
            }
        }

        const safeCourses: Course[] = [];
        if (userData.teacher?.courses) {
            for (const course of userData.teacher.courses) {
                safeCourses.push({
                    id: course.id,
                    teacherId: userData.teacher?.id,
                    name: course.name,
                    subject: course.subject,
                    grade: course.grade,
                    room: course.room,
                    period: course.period,
                    studentCount: course._count.students,
                });
            }
        }

        const safeAnnouncements: Announcement[] = [];
        if (announcementsData) {
            for (const announcement of announcementsData) {
                const userTitle = announcement.user?.role === 'admin' ? announcement.user?.admin?.title : announcement.user?.role;
                safeAnnouncements.push({
                    id: announcement.id,
                    title: announcement.title,
                    content: announcement.content,
                    imageUrl: announcement.imageUrl || undefined,
                    scope: announcement.scope || undefined,
                    createdAt: announcement.createdAt,
                    userFirstName: announcement.user?.firstName,
                    userLastName: announcement.user?.lastName,
                    userTitle: userTitle,
                });
            }
        }

        const teacherDashboardData: TeacherDashboardData = {
            teacher: safeTeacher,
            appointments: safeAppointments,
            behaviors: safeBehaviors,
            courses: safeCourses,
            announcements: safeAnnouncements,
        };

        return teacherDashboardData;

    } catch (error) {
        return error as Error;
    }
}