# Soul Academy Agent Guide

This repository uses Cursor project rules and skills as the primary source of truth for AI-assisted implementation.

## Goal

Build and maintain a school-management web app with:
- Next.js App Router (`src/app`)
- Prisma + PostgreSQL (`prisma`, `src/lib/prisma.ts`)
- Cookie/JWT auth (`src/app/lib/session.ts`)
- Server Actions (`src/app/**/_actions`)
- Route-scoped components (`src/app/**/_components`)
- Global styling via Tailwind v4 + `globals.css`, fonts in `src/app/lib/fonts.ts`, wired in `src/app/layout.tsx`
- Global modals via `ModalProvider` + portal `Modal` in `src/app/(_home)/_context/Modal.tsx`, wired in root `layout.tsx`, opened with `OpenModalComponents` where possible
- Shared types and Zod forms in `src/app/lib/definitions.ts`; pure grading/behavior/sort helpers in `src/app/lib/grading.ts`; formatting in `typeConversion.ts`

## Use Order

When implementing features, follow this sequence:
1. Directory organization
2. Database design and seed strategy
3. Authentication/session flow
4. Server actions
5. Components
6. CSS organization (`globals.css`, `fonts.ts`, root `layout.tsx` body classes) when adding tokens, fonts, or shared classes
7. Pages/routes

## Rule and Skill Locations

- Rules: `.cursor/rules/*.mdc`
- Skills: `.cursor/skills/*/SKILL.md`

Agents should load the relevant rule first, then apply the corresponding skill workflow.

For styling changes, use `.cursor/rules/css-organization.mdc` and `.cursor/skills/scaffold-css-organization/SKILL.md`.

For modals, use `.cursor/rules/modal-organization.mdc` and `.cursor/skills/scaffold-modals/SKILL.md`.

For shared types and domain helpers, use `.cursor/rules/type-and-domain-lib-organization.mdc` and `.cursor/skills/scaffold-types-and-domain-libs/SKILL.md`.
