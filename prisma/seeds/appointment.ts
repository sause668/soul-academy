import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { appointments } from "./data/appointment-data";

const appointmentData: Prisma.AppointmentCreateInput[] = [];

for (const appointment of appointments) {
    appointmentData.push({
        name: appointment.name,
        description: appointment.description,
        startTime: new Date(appointment.startTime),
        endTime: new Date(appointment.endTime),
        teacher: { connect: { id: appointment.teacherId } },
        student: { connect: { id: appointment.studentId } },
        course: { connect: { id: appointment.courseId } },
    });
}

export async function seedAppointments(prisma: PrismaClient) {
    for (const appointment of appointmentData) {
        await prisma.appointment.create({ data: appointment });
    }
}