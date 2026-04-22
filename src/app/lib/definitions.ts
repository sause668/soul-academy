import { JWTPayload } from "jose";
import * as z from 'zod'

// Session Definitions
export interface SessionPayload extends JWTPayload {
    userId: string;
    userRole: string;
    userRoleId: string;
    expiresAt: Date;
}

export interface ActionResponse {
    message?: string;
}

//Login Form Definitions
export const LoginFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        // .min(8, { error: 'Be at least 8 characters long' })
        // .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        // .regex(/[0-9]/, { error: 'Contain at least one number.' })
        // .regex(/[^a-zA-Z0-9]/, {
        //     error: 'Contain at least one special character.',
        // })
        .trim(),
})

export type LoginFormState = {
    errors: string[],
    properties?: {
        email?: { errors: string[] } | undefined;
        password?: { errors: string[] } | undefined;
    } | undefined
} | undefined

// Signup Form Definitions
export const SignupFormSchema = z
    .object({
        firstName: z.string().min(1, { error: 'First Name is required' }).trim(),
        lastName: z.string().min(1, { error: 'Last Name is required' }).trim(),
        username: z.string().min(1, { error: 'Username is required' }).trim(),
        email: z.email({ error: 'Please enter a valid email.' }).trim(),
        password: z
            .string()
            .min(8, { error: 'Password must be at least 8 characters long' })
            .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
            .regex(/[0-9]/, { error: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, { error: 'Contain at least one special character.', })
            .trim(),
        confirmPassword: z.string().trim()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"]

    })

export type SignupFormState = {
    errors: string[],
    properties?: {
        firstName?: { errors: string[] } | undefined;
        lastName?: { errors: string[] } | undefined;
        username?: { errors: string[] } | undefined;
        email?: { errors: string[] } | undefined;
        password?: { errors: string[] } | undefined;
        confirmPassword?: { errors: string[] } | undefined;
    } | undefined
} | undefined

// User Definitions
export interface User {
    id?: number | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    role?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    teacher?: Teacher | undefined;
    student?: Student | undefined;
    admin?: Admin | undefined;
    announcements?: Announcement[];
}

// Teacher Definitions
export interface Teacher {
    id?: number;
    userId?: number;
    firstName?: string ;
    lastName?: string;
    email?: string;
    primaryGrade?: string;
    primarySubject?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
    courses?: Course[];
    appointments?: Appointment[];
} 

export interface TeacherDashboardData {
    teacher?: Teacher;
    appointments?: Appointment[];
    behaviors?: Behavior[];
    courses?: Course[];
    announcements?: Announcement[];
}

//Student Definitions
export interface Student {
    id?: number;
    userId?: number;
    familyId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    currentGrade?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
    family?: Family;
    courses?: Course[];
    grades?: Grade[];
    behaviors?: Behavior[];
    groups?: Group[];
    appointments?: Appointment[];
    siblings?: Student[];
}

export interface StudentDashboardData {
    student: Student;
    appointments: Appointment[];
    behaviors: Behavior[];
    courses: Course[];
    announcements: Announcement[];
}

export interface PriorityStudent {
    id: number;
    firstName: string;
    lastName: string;
    priorityNumber: number;
    priority: string;
}

export interface StudentData {
    student: Student;
    behaviors: Behavior[];
    courses: Course[];
}

//Family Definitions
export interface Family {
    id: number;
    familyName: string;
    students?: Student[];
}

//Admin Definitions
export interface Admin {
    id?: number;
    userId?: number;
    title?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: User | undefined;
}

//Course Definitions
export interface Course {
    id?: number;
    teacherId?: number;
    isTeacher?: boolean;
    name?: string;
    subject?: string;
    grade?: number;
    room?: string;
    period?: number;
    createdAt?: Date;
    updatedAt?: Date;
    teacher?: Teacher;
    students?: Student[];
    studentCount?: number;
    assignments?: Assignment[];
    behaviors?: Behavior[];
    groups?: Group[];
    appointments?: Appointment[];
    announcements?: Announcement[];
    finalGrade?: number | string;
}

export interface CourseData {
    course: Course;
    students: Student[];
    assignments: Assignment[];
    behaviors: Behavior[];
    groups: Group[];
    announcements: Announcement[];
}

export interface CourseStudentData {
    course: Course;
    assignments: Assignment[];
    behavior: Behavior;
    group: Group;
    announcements: Announcement[];
}

export interface GradebookData {
    course: Course;
    assignments: Assignment[];
    students: Student[];
    behaviors: Behavior[];
    groups: Group[];
}

//Assignment Definitions
export interface Assignment {
    id?: number;
    courseId?: number;
    name?: string;
    type?: string;
    quarter?: number;
    dueDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    course?: Course;
    grades?: Grade[];
    grade?: number;
}

export const AssignmentFormSchema = z.object({
    name: z
        .string()
        .min(1, { error: 'Assignment Name is required' })
        .trim(),
    type: z
        .string()
        .refine((type) => ['CW', 'HW', 'Q', 'T', 'P'].includes(type), { message: 'Invalid Assignment Type' })
        .trim(),
    dueDate: z
        .date()
        // .min(new Date(), { error: 'Due Date must be in the future' })
})

export type AssignmentFormState = {
    errors: string[],
    properties?: {
        name?: { errors: string[] } | undefined;
        type?: { errors: string[] } | undefined;
        dueDate?: { errors: string[] } | undefined;
    } | undefined
} | undefined

//Grade Definitions
export interface Grade {
    assignmentId?: number;
    studentId?: number;
    grade?: number;
    createdAt?: Date;
    updatedAt?: Date;
    assignment?: Assignment;
    student?: Student;
}

export const GradeFormSchema = z.object({
    grade: z
        .number()
        .min(0, { error: 'Grade must be between 0 and 100' })
        .max(100, { error: 'Grade must be between 0 and 100' })
})

export type GradeFormState = {
    errors: string[],
    properties?: {
        grade?: { errors: string[] } | undefined;
    } | undefined
} | undefined

export interface GradeData {
    grade: number;
    type: string;
}

export interface Rubric {
    HW: number;
    CW: number;
    Q: number;
    T: number;
    P: number;
}

//Behavior Definitions
export interface Behavior {
    id?: number;
    studentId?: number;
    courseId?: number;
    attention?: number;
    learnability?: number;
    cooperation?: number;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    student?: Student;
    course?: Course;
    courseName?: string;
}

export const BehaviorFormSchema = z.object({
    attention: z
        .number()
        .min(0, { error: 'Attention must be between 0 and 5' })
        .max(5, { error: 'Attention must be between 0 and 5' }),
    learnability: z
        .number()
        .min(0, { error: 'Learnability must be between 0 and 5' })
        .max(5, { error: 'Learnability must be between 0 and 5' }),
    cooperation: z
        .number()
        .min(0, { error: 'Cooperation must be between 0 and 5' })
        .max(5, { error: 'Cooperation must be between 0 and 5' }),
})

export type BehaviorFormState = {
    errors: string[],
    properties?: {
        attention?: { errors: string[] } | undefined;
        learnability?: { errors: string[] } | undefined;
        cooperation?: { errors: string[] } | undefined;
    } | undefined
} | undefined

//Group Definitions
export interface Group {
    id?: number;
    courseId?: number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    course?: Course;
    students?: Student[];
}

export const GroupFormSchema = z.object({
    name: z
        .string()
        .min(1, { error: 'Group Name is required' })
        .trim(),
})

export type GroupFormState = {
    errors: string[],
    properties?: {
        name?: { errors: string[] } | undefined;
    } | undefined
} | undefined

//Appointment Definitions
export interface Appointment {
    id?: number;
    teacherId?: number;
    studentId?: number;
    courseId?: number;
    name?: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    teacher?: Teacher;
    student?: Student;
    course?: Course;
}

    export const AppointmentFormSchema = z.object({
    teacherId: z
        .number()
        .min(1, { error: 'Teacher is required' }),
    studentId: z
        .number()
        .min(1, { error: 'Student is required' }),
    // startTime: z
    //     .date()
    //     .min(new Date(), { error: 'Start Time must be in the future' }),
    // endTime: z
    //     .date()
    //     .min(new Date(), { error: 'End Time must be in the future' }),
})

export type AppointmentFormState = {
    errors: string[],
    properties?: {
        teacherId?: { errors: string[] } | undefined;
        studentId?: { errors: string[] } | undefined;
        courseId?: { errors: string[] } | undefined;
        startTime?: { errors: string[] } | undefined;
        endTime?: { errors: string[] } | undefined;
        name?: { errors: string[] } | undefined;
        description?: { errors: string[] } | undefined;
    } | undefined
} | undefined

//Announcement Definitions
export interface Announcement {
    id?: number;
    userId?: number;
    title?: string;
    content?: string;
    imageUrl?: string;
    scope?: string;
    userFirstName?: string;
    userLastName?: string;
    userTitle?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
    courses?: Course[];
}

export interface AppointmentsData {
    user: User;
    appointments: Appointment[];
}

//Deck Definitions
export interface Deck {
    id?: number;
    userId?: number;
    name?: string;
    description?: string;
    cards?: Card[];
    updatedAt?: Date;
    createdAt?: Date;
}

export interface Card {
    id: number;
    name: string;
    description: string;
}

export type DeckData = Promise<Deck | Error> | Error;

//Deck Form Definitions
export const DeckFormSchema = z.object({
    deckName: z
        .string()
        .min(1, { error: 'Deck Name is required' })
        .trim(),
    deckDescription: z
        .string()
        .min(1, { error: 'Deck Description is required' })
        .trim(),
})

export type DeckFormState = {
    errors: string[],
    properties?: {
        deckName?: { errors: string[] } | undefined;
        deckDescription?: { errors: string[] } | undefined;
    } | undefined
} | undefined



