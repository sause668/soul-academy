import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedUsers } from "./seeds/users";
import { seedFamilies } from "./seeds/family";
import { seedCourses } from "./seeds/course";
import { seedGrades } from "./seeds/grades";
import { seedBehaviors } from "./seeds/behavior";
import { seedAppointments } from "./seeds/appointment";
import { seedGroups } from "./seeds/group";
import { seedAnnouncements } from "./seeds/announcement";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});

async function main() {
    await seedUsers(prisma);
    await seedFamilies(prisma);
    await seedCourses(prisma);
    await seedGrades(prisma);
    await seedBehaviors(prisma);
    await seedGroups(prisma);
    await seedAppointments(prisma);
    await seedAnnouncements(prisma);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });