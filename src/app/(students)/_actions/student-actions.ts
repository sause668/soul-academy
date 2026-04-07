'use server';

import { Assignment, Behavior, Course, CourseData, Grade, Student, StudentData, Teacher } from "@/app/lib/definitions";
import { verifySession } from "@/app/lib/session";
import prisma from "@/lib/prisma";

export async function getStudentsData() {
    try {
        const studentsData = await prisma.student.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });

        const safeStudentsData: Student[] = [];
        for (const student of studentsData) {
            safeStudentsData.push({
                id: student.id,
                firstName: student.user.firstName,
                lastName: student.user.lastName,
                email: student.user.email,
                currentGrade: student.currentGrade,
            });
        }

        return safeStudentsData;
    } catch (error) {
        return error as Error;
    }
}

export async function getStudentsSearchData(search: string) {
    try {
        const session = await verifySession();

        if (session instanceof Error) throw session;

        if (session.userRole === 'student') throw new Error('Unauthorized');

        const studentsData = await prisma.student.findMany({
            where: {
                user: {
                    OR: [
                        { firstName: { contains: search, mode: 'insensitive' } },
                        { lastName: { contains: search, mode: 'insensitive' } },
                    ],
                },
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });

        const safeStudentsData: Student[] = [];
        for (const student of studentsData) {
            safeStudentsData.push({
                id: student.id,
                firstName: student.user.firstName,
                lastName: student.user.lastName,
                email: student.user.email,
                currentGrade: student.currentGrade,
            });
        }

        return safeStudentsData;
    } catch (error) {
        return error as Error;
    }
}

export async function getStudentPageData(studentId: string) {
    try {
        const studentData = await prisma.student.findUnique({
            where: { id: parseInt(studentId) },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                family: {
                    include: {
                        siblings: {
                            omit: {
                                familyId: true,
                                currentGrade: true,
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
                courses: {
                    omit: {
                        createdAt: true,
                        updatedAt: true,
                    },
                    include: {
                        teacher: {
                            omit: {
                                userId: true,
                                primarySubject: true,
                                primaryGrade: true,
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
                            omit: {
                                createdAt: true,
                                updatedAt: true,
                            },
                            include: {
                                grades: {
                                    where: { studentId: parseInt(studentId) },
                                    omit: {
                                        createdAt: true,
                                        updatedAt: true,
                                    },
                                },
                            },
                        },
                        behaviors: {
                            where: { studentId: parseInt(studentId) },
                            omit: {
                                createdAt: true,
                                updatedAt: true,
                            }
                        },
                    }
                }
            }
        });


        if (!studentData) throw new Error('Student not found');

        const safeStudent: Student = {
            id: studentData?.id,
            firstName: studentData?.user?.firstName,
            lastName: studentData?.user?.lastName,
            email: studentData?.user?.email,
            currentGrade: studentData?.currentGrade,
            siblings: studentData?.family?.siblings.map(sibling => ({
                id: sibling.id,
                firstName: sibling.user.firstName,
                lastName: sibling.user.lastName,
            } as Student)),
        };

        const safeBehaviors: Behavior[] = [];
        if (studentData?.courses) {
            for (const course of studentData?.courses) {
                if (course.behaviors.length > 0) {
                    safeBehaviors.push({
                        id: course.behaviors[0].id,
                        courseId: course.id,
                        attention: course.behaviors[0].attention ?? undefined,
                        learnability: course.behaviors[0].learnability ?? undefined,
                        cooperation: course.behaviors[0].cooperation ?? undefined,
                        courseName: course.name,
                    });
                }
            }
        }

        const safeCourses: Course[] = [];
        if (studentData?.courses) {
            for (const course of studentData?.courses) {
                const safeTeacher: Teacher = {
                    id: course.teacher.id,
                    firstName: course.teacher.user.firstName,
                    lastName: course.teacher.user.lastName,
                };

                const safeAssignments: Assignment[] = [];

                for (const assignment of course.assignments) {
                    safeAssignments.push({
                        id: assignment.id,
                        name: assignment.name,
                        type: assignment.type,
                        quarter: assignment.quarter,
                        dueDate: assignment.dueDate,
                        grade: assignment.grades.length > 0 ? assignment.grades[0].grade : undefined,
                    });
                }

                safeCourses.push({
                    id: course.id,
                    name: course.name,
                    subject: course.subject,
                    grade: course.grade,
                    room: course.room,
                    period: course.period,
                    teacher: safeTeacher,
                    assignments: safeAssignments,
                });
            }


        }

        const safeStudentData: StudentData = {
            student: safeStudent,
            behaviors: safeBehaviors,
            courses: safeCourses,
        };

        return safeStudentData;

    } catch (error) {
        return error as Error;
    }
}