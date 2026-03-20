This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Pull New Branch
```bash
git fetch origin
git checkout prisma-developement
```

## Installation & Setup

### Install Next.js

`npx create-next-app@latest [project-name]`

### Install Prisma ORM

- Install Necessary Dependencies 
  - `npm install prisma tsx @types/pg --save-dev`
  - `npm install @prisma/client @prisma/adapter-pg dotenv pg`

- Initialize Prisma Postgres Database, Config, and `.env` File
  - `npx prisma init --db --output @/app/generated/prisma`
- Add `seed: 'tsx prisma/seed.ts'` to `migrations` in `prisma.config.ts` file

-Add Secret Key for Session Management
  - run `openssl rand -base64 32` terminal
  - add key to .env as SESSION_SECRET


### Modify Prisma ORM Database
- Add Models to `schema.prisma`

- Migrate Database Tables (Do After Every Model Edit)
  - `npx prisma migrate dev --name init`

- Resets migrations
  - `npx prisma migrate reset` 

- Update Database Table without using migrations (Development Only)
- `npx prisma db push`

- Generate Prisma Client (Do After Every Migration or Push)
  - `npx prisma generate`

- Add Seed data in `prisma/seed.ts`.  Add path to `prisma.config.ts`.
```javascript
    migrations: {
        path: "prisma/migrations",
        seed: `tsx prisma/seed.ts`, 
    },
  ```

- Seed Data
  - `npx prisma db seed`

- Clear Seed Data
  - `npx prisma db push --force-reset --accept-data-loss`

- View Database
  - `npx prisma studio`


## Prisma Queries

### Create
- `create`
- `createMany`
- `createManyAndReturn`

### Read
- `findUnique`
- `findMany`
- `findFirst`
- `where: { email: { endsWith: "prisma.io" } }`
- `select: { email: true, name: true }`
- `include: { posts: true },`

### Update
- `update`
- `updateMany`
- `updateManyAndReturn`
- `upsert`
```javascript
const upsertUser = await prisma.user.upsert({
  where: { email: "viola@prisma.io" },
  update: { name: "Viola the Magnificent" },
  create: { email: "viola@prisma.io", name: "Viola the Magnificent" },
});

await prisma.post.updateMany({
  data: {
    views: { increment: 1 },
    likes: { increment: 1 },
  },
});
```

### Delete
- `delete`
- `deleteMany`


## Relation Queries
Because the relationLoadStrategy option is currently in Preview, you need to enable it via the relationJoins preview feature flag in your Prisma schema file:

```javascript
generator client {
  provider        = "prisma-client"
  output          = "./generated"
  previewFeatures = ["relationJoins"]
}
```

Prisma Client supports two load strategies for relations:

- join (default): Uses a database-level LATERAL JOIN (PostgreSQL) or correlated subqueries (MySQL) and fetches all data with a single query to the database.
- query: Sends multiple queries to the database (one per table) and joins them on the application level.

```javascript
const users = await prisma.user.findMany({
  relationLoadStrategy: "join", // or 'query'
  include: {
    posts: true,
  },
});
```

## Tailwind CSS Tips
### Measurements
- `4` in className is the same as `1rem`. Ex: `gap-4` = `gap-[1rem]`






