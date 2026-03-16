import { PrismaClient, Prisma } from "../src/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from 'bcryptjs';
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});
const userData: Prisma.UserCreateInput[] = [
  {
    firstName: "Jane",
    lastName: "Foster",
    username: "jfoster",
    email: "jane.foster@magicdecks.com",
    password: bcrypt.hashSync("password", 10),
    decks: {
      create: [
        {
            name: "Ral",
            description: "Spellslinger",
            cards: {
                create: [
                    {
                        name: "Strick it Rich",
                        description: "Make a treasure token",
                    },
                    {
                        name: "Reckless Impulse",
                        description: "Draw 2 cards, then discard a card",
                    },
                ],
            },
        },
        {
            name: "Firelord Azula",
            description: "Copy on Attack",
            cards: {
                create: [
                    {
                        name: "Frantic Search",
                        description: "Draw 2 cards, then discard a card.  Untap two lands",
                    },
                    {
                        name: "Valley Floodcrawler",
                        description: "Noncreature spell have flash",
                    },
                ],
            },
        },
        {
            name: "Katara",
            description: "Card Draw",
            cards: {
                create: [
                    {
                        name: "Drematic Reversal",
                        description: "Untap all nonland permanents",
                    },
                    {
                        name: "Hulbreaker Horror",
                        description: "Spell can't be countered",
                    },
                ],
            },
        },
      ],
    },
  },
];
export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}
main();