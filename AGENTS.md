# Soul Academy Agent Guide

This repository uses Cursor project rules and skills as the primary source of truth for AI-assisted implementation.

## Goal

Build and maintain a school-management web app with:

- Next.js App Router (`src/app`)
- Prisma + PostgreSQL (`prisma`, `prisma.config.ts`, `src/lib/prisma.ts`)
- Cookie/JWT auth (`src/app/lib/session.ts`, user actions under `src/app/**/_actions`)
- Server Actions (`src/app/**/_actions`)
- Route-scoped components (`src/app/**/_components`)
- Global styling via Tailwind v4 + `src/app/globals.css`, fonts in `src/app/lib/fonts.ts`, wired in `src/app/layout.tsx`
- Global modals via `ModalProvider` + portal `Modal` in `src/app/(_home)/_context/Modal.tsx`, wired in root `src/app/layout.tsx`, opened with `OpenModalComponents` where possible
- Shared types and Zod forms in `src/app/lib/definitions.ts`; pure grading/behavior/sort helpers in `src/app/lib/grading.ts`; formatting in `src/app/lib/typeConversion.ts`

## Use order

When implementing features, follow this sequence (aligned with `.cursor/rules/application-blueprint.mdc`):

1. **Bootstrap** — `.cursor/rules/setup/install-dependencies.mdc` (from-scratch or new toolchain steps)
2. **Directories** — `.cursor/rules/frontend/directory-organization.mdc`
3. **Database** — `.cursor/rules/database/database-setup.mdc`
4. **Authentication** — `.cursor/rules/authentication/authentication-setup.mdc`
5. **Layouts** — `.cursor/rules/frontend/layout-structure.mdc` (root or segment `layout.tsx`)
6. **Server actions** — `.cursor/rules/frontend/server-action-structure-organization.mdc`
7. **Pages and components** — `.cursor/rules/frontend/page-component-structure.mdc`
8. **Modals** — `.cursor/rules/frontend/modal-setup-structure.mdc`
9. **CSS / Tailwind / fonts** — `.cursor/rules/frontend/css-setup-structure.mdc` when adding tokens, globals layers, or feature-level CSS
10. **Shared types and domain lib** — `.cursor/rules/frontend/type-and-domain-lib-organization.mdc`

## Rule and skill locations

- **Rules:** `.cursor/rules/` — nested by concern:
  - `application-blueprint.mdc` (always-on architecture summary + rule index)
  - `setup/install-dependencies.mdc`
  - `database/database-setup.mdc`
  - `authentication/authentication-setup.mdc`
  - `frontend/*.mdc` — directory layout, pages/components, layouts, server actions, modals, CSS, types/lib
- **Skills:** `.cursor/skills/*/SKILL.md`

Load the rule that matches the task, then apply the corresponding skill workflow when one exists (for example `scaffold-database-build`, `scaffold-authentication-build`, `scaffold-server-actions`, `scaffold-components`, `scaffold-pages`, `scaffold-modals`, `scaffold-css-organization`, `scaffold-types-and-domain-libs`).

## Quick map (topic → rule)

| Task | Rule |
|------|------|
| Overall architecture | `.cursor/rules/application-blueprint.mdc` |
| `npm` / Prisma / install flow | `.cursor/rules/setup/install-dependencies.mdc` |
| Folders, `page.tsx`, `_components` | `.cursor/rules/frontend/directory-organization.mdc` |
| Schema, migrate, seed layout | `.cursor/rules/database/database-setup.mdc` |
| Sessions, login, signup, logout (lib + actions) | `.cursor/rules/authentication/authentication-setup.mdc` |
| `layout.tsx`, metadata, providers | `.cursor/rules/frontend/layout-structure.mdc` |
| `_actions` file split and patterns | `.cursor/rules/frontend/server-action-structure-organization.mdc` |
| Thin pages vs feature section files | `.cursor/rules/frontend/page-component-structure.mdc` |
| ModalProvider, `Modal`, `Modals/` folders | `.cursor/rules/frontend/modal-setup-structure.mdc` |
| `globals.css`, `@theme`, fonts | `.cursor/rules/frontend/css-setup-structure.mdc` |
| `definitions.ts`, `grading.ts`, Zod | `.cursor/rules/frontend/type-and-domain-lib-organization.mdc` |
