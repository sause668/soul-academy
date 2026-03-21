'use server'

import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { Announcement, Appointment, Assignment, Behavior, Course, Grade, Student, StudentDashboardData, Teacher } from "@/app/lib/definitions";
import { SessionPayload } from "@/app/lib/definitions";
import { calcFinalGradeStudent } from "@/app/lib/grading";

export async function getStudentDashboardData(session: SessionPayload) {
    const { userId, userRoleId } = session;
    try {
        const userData = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            omit: {
                hashedPassword: true,
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
                    },
                    include: {
                        courses: {
                            omit: {
                                teacherId: true,
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
                                        user: {
                                            select: {
                                                firstName: true,
                                                lastName: true,
                                            },
                                        },
                                    },
                                },
                                assignments: {
                                    where: {
                                        quarter: 1,
                                    },
                                    omit: {
                                        // courseId: true,
                                        dueDate: true,
                                        name: true,
                                        createdAt: true,
                                        updatedAt: true,
                                    },
                                    include: {
                                        grades: {
                                            where: {
                                                studentId: parseInt(userRoleId),
                                            },
                                            omit: {
                                                assignmentId: true,
                                                studentId: true,
                                                createdAt: true,
                                                updatedAt: true,
                                            },
                                        },
                                    },
                                },
                                behaviors: {
                                    where: {
                                        studentId: parseInt(userRoleId),
                                    },
                                    omit: {
                                        studentId: true,
                                        courseId: true,
                                        notes: true,
                                        createdAt: true,
                                        updatedAt: true,
                                    },
                                },
                            },
                        },
                        appointments: {
                            omit: {
                                studentId: true,
                                courseId: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                            include: {
                                teacher: {
                                    omit: {
                                        userId: true,
                                        primaryGrade: true,
                                        primarySubject: true,
                                        createdAt: true,
                                        updatedAt: true,
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
            },
        });

        const announcementsData = await prisma.announcement.findMany({
            where: {
                scope: 'school',
            },
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

        const safeStudent: Student = {
            id: userData?.student?.id,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email,
            currentGrade: userData?.student?.currentGrade,
        };

        const safeAppointments: Appointment[] = [];
        if (userData?.student?.appointments) {
            for (const appointment of userData?.student?.appointments) {
                const safeTeacher: Teacher = {
                    id: appointment.teacher?.id,
                    firstName: appointment.teacher?.user?.firstName,
                    lastName: appointment.teacher?.user?.lastName
                };
                // const safeCourse: Course = {
                //     id: appointment.course?.id,
                //     name: appointment.course?.name,
                //     subject: appointment.course?.subject,
                //     grade: appointment.course?.grade,
                // };
                safeAppointments.push({
                    id: appointment.id,
                    teacherId: appointment.teacherId,
                    // courseId: appointment.course?.id,
                    name: appointment.name,
                    description: appointment.description || undefined,
                    startTime: appointment.startTime,
                    endTime: appointment.endTime,
                    teacher: safeTeacher,
                    // course: safeCourse,
                });
            }
        }

        const safeBehaviors: Behavior[] = [];
        const safeCourses: Course[] = [];

        if (userData?.student?.courses) {
            for (const course of userData.student.courses) {
                const safeTeacher: Teacher = {
                    id: course.teacher?.id,
                    firstName: course.teacher?.user?.firstName,
                    lastName: course.teacher?.user?.lastName
                };

                console.log('bah');

                console.log('Course', course);
                // console.log('Course. Assignments', course.assignments[0]);
                console.log('lah');

                const safeAssignments: Assignment[] = [];
                for (const assignment of course.assignments) {
                    console.log('Assignment', {id: assignment.id, courseId: assignment.courseId, type: assignment.type});
                    safeAssignments.push({
                        id: assignment.id,
                        courseId: course.period,
                        type: assignment.type || undefined,
                        // grade: assignment.grades[0]?.grade,
                    });
                }

                // console.log('safeAssignments', safeAssignments);

                

                safeCourses.push({
                    name: course.name,
                    room: course.room,
                    period: course.period,
                    teacher: safeTeacher,
                    finalGrade: calcFinalGradeStudent(safeAssignments),
                    });

                safeBehaviors.push({
                    courseName: course.name,
                    attention: course.behaviors[0].attention,
                    learnability: course.behaviors[0].learnability,
                    cooperation: course.behaviors[0].cooperation,
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

        const studentDashboardData: StudentDashboardData = {
            student: safeStudent,
            appointments: safeAppointments,
            behaviors: safeBehaviors,
            courses: safeCourses,
            announcements: safeAnnouncements,
        };

        return studentDashboardData;

        
    } catch (error) {
        return error as Error;
    }
}