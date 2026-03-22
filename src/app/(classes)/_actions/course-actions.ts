import prisma from "@/lib/prisma";
import { Announcement, Assignment, Behavior, Course, CourseData, CourseStudentData, Grade, Group, SessionPayload, Student, Teacher } from "@/app/lib/definitions";

export async function getCourseData(courseId: string, session: SessionPayload) {
    const { userId, userRoleId } = session;

    try {
        const courseData = await prisma.course.findUnique({
            where: { id: parseInt(courseId) },
            omit: {
                createdAt: true,
                updatedAt: true,
            },
            include: {
                teacher: {
                    omit: {
                        id: true,
                        primaryGrade: true,
                        primarySubject: true,
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
                students: {
                    omit: {
                        userId: true,
                        familyId: true,
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
                        // grades: {
                        //     omit: {
                        //         assignmentId: true,
                        //         createdAt: true,
                        //         updatedAt: true,
                        //     },
                        //     include: {
                        //         assignment: {
                        //             where: {
                        //                 quarter: 1,
                        //             },
                        //             select: {
                        //                 quarter: true,
                        //             },
                        //         },
                        //     },
                        // },
                    },
                },
                assignments: {
                    omit: {
                        createdAt: true,
                        updatedAt: true,
                    },
                    include: {
                        grades: {
                            omit: {
                                assignmentId: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
                behaviors: {
                    omit: {
                        courseId: true,
                        notes: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                groups: {
                    omit: {
                        courseId: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    include: {
                        students: {
                            omit: {
                                userId: true,
                                familyId: true,
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
        });

        const announcementsData = await prisma.announcement.findMany({
            where: {
                scope: 'course',
                course: {
                    some: {
                        id: parseInt(courseId),
                    },
                },
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

        const safeCourse: Course = {
            id: courseData?.id,
            teacherId: courseData?.teacherId,
            isTeacher: courseData?.teacherId === parseInt(userRoleId),
            name: courseData?.name,
            subject: courseData?.subject,
            grade: courseData?.grade,
            room: courseData?.room,
            period: courseData?.period,
            teacher: {
                firstName: courseData?.teacher?.user?.firstName,
                lastName: courseData?.teacher?.user?.lastName,
            } as Teacher,
        };

        const safeStudents: Student[] = [];
        if (courseData?.students) {
            for (const student of courseData.students) {
                safeStudents.push({
                    id: student.id,
                    firstName: student.user?.firstName,
                    lastName: student.user?.lastName,
                });
            }
        }

        const safeAssignments: Assignment[] = [];
        if (courseData?.assignments) {
            for (const assignment of courseData.assignments) {
                const safeGrades: Grade[] = [];

                if (assignment.grades) {
                    for (const grade of assignment.grades) {
                        safeGrades.push({
                            studentId: grade.studentId,
                            grade: grade.grade,
                        });
                    }
                }

                safeAssignments.push({
                    id: assignment.id,
                    name: assignment.name,
                    type: assignment.type,
                    quarter: assignment.quarter,
                    dueDate: assignment.dueDate,
                    grades: safeGrades,
                });
            }
        }
        
        const safeBehaviors: Behavior[] = [];
        if (courseData?.behaviors) {
            for (const behavior of courseData.behaviors) {
                safeBehaviors.push({
                    id: behavior.id,
                    studentId: behavior.studentId,
                    attention: behavior.attention,
                    learnability: behavior.learnability,
                    cooperation: behavior.cooperation,
                });
            }
        }

        const safeGroups: Group[] = [];
        if (courseData?.groups) {
            for (const group of courseData.groups) {
                const safeStudents: Student[] = [];

                if (group.students) {
                    for (const student of group.students) {
                        safeStudents.push({
                            id: student.id,
                            firstName: student.user?.firstName,
                            lastName: student.user?.lastName,
                        });
                    }
                }

                safeGroups.push({
                    id: group.id,
                    name: group.name,
                    students: safeStudents,
                });
            }
        }

        const safeAnnouncements: Announcement[] = [];
        if (announcementsData) {
            for (const announcement of announcementsData) {
                safeAnnouncements.push({
                    id: announcement.id,
                    title: announcement.title,
                    content: announcement.content,
                    imageUrl: announcement.imageUrl || undefined,
                    scope: announcement.scope || undefined,
                    createdAt: announcement.createdAt,
                    userFirstName: announcement.user?.firstName,
                    userLastName: announcement.user?.lastName,
                    userTitle: announcement.user?.role === 'admin' ? announcement.user?.admin?.title : announcement.user?.role,
                });
            }
        }

        const coursePageData: CourseData = {
            course: safeCourse,
            students: safeStudents,
            assignments: safeAssignments,
            behaviors: safeBehaviors,
            groups: safeGroups,
            announcements: safeAnnouncements,
        };

        return coursePageData;

    } catch (error) {
        return error as Error;
    }
}

export async function getCourseStudentData(courseId: string, session: SessionPayload) {
    const { userId, userRoleId } = session;
    try {
        const courseData = await prisma.course.findUnique({
            where: { id: parseInt(courseId) },
            omit: {
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
                    omit: {
                        createdAt: true,
                        updatedAt: true,
                    },
                    include: {
                        grades: {
                            where: { studentId: parseInt(userRoleId) },
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
                    where: { studentId: parseInt(userRoleId) },
                    omit: {
                        studentId: true,
                        courseId: true,
                        notes: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                groups: {
                    where: {
                        students: {
                            some: { id: parseInt(userRoleId) },
                        },
                    },
                    omit: {
                        courseId: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    include: {
                        students: {
                            where: { id: { not: parseInt(userRoleId) } },
                            omit: {
                                currentGrade: true,
                                userId: true,
                                familyId: true,
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
        });

        const announcementsData = await prisma.announcement.findMany({
            where: {
                scope: 'course',
                course: {
                    some: {
                        id: parseInt(courseId),
                    },
                },
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

        const safeCourse: Course = {
            id: courseData?.id,
            name: courseData?.name,
            subject: courseData?.subject,
            grade: courseData?.grade,
            room: courseData?.room,
            period: courseData?.period,
            teacher: {
                firstName: courseData?.teacher?.user?.firstName,
                lastName: courseData?.teacher?.user?.lastName,
            } as Teacher,
        };

        const safeAssignments: Assignment[] = [];
        if (courseData?.assignments) {
            for (const assignment of courseData.assignments) {

                safeAssignments.push({
                    id: assignment.id,
                    name: assignment.name,
                    type: assignment.type,
                    quarter: assignment.quarter,
                    dueDate: assignment.dueDate,
                    grade: assignment.grades[0]?.grade,
                });
            }
        }

        const safeBehavior: Behavior = {
            attention: courseData?.behaviors[0]?.attention,
            learnability: courseData?.behaviors[0]?.learnability,
            cooperation: courseData?.behaviors[0]?.cooperation,
        };

        const safeGroup: Group = {
            id: courseData?.groups[0]?.id,
            name: courseData?.groups[0]?.name,
            students: courseData?.groups[0]?.students.map((student) => ({
                id: student.id,
                firstName: student.user?.firstName,
                lastName: student.user?.lastName,
            })),
        };

        const safeAnnouncements: Announcement[] = [];
        if (announcementsData) {
            for (const announcement of announcementsData) {
                safeAnnouncements.push({
                    id: announcement.id,
                    title: announcement.title,
                    content: announcement.content,
                    imageUrl: announcement.imageUrl || undefined,
                    scope: announcement.scope || undefined,
                    createdAt: announcement.createdAt,
                    userFirstName: announcement.user?.firstName,
                    userLastName: announcement.user?.lastName,
                    userTitle: announcement.user?.role === 'admin' ? announcement.user?.admin?.title : announcement.user?.role,
                });
            }
        }

        const courseStudentData: CourseStudentData = {
            course: safeCourse,
            assignments: safeAssignments,
            behavior: safeBehavior,
            group: safeGroup,
            announcements: safeAnnouncements,
        };

        return courseStudentData;

    } catch (error) {
        return error as Error;
    }
}

