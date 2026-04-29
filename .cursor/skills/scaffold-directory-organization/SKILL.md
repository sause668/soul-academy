---
name: scaffold-directory-organization
description: Builds a Soul Academy style directory skeleton for Next.js App Router with domain route groups, _actions, _components, and shared lib boundaries. Use when creating a new project foundation or reorganizing folders.
---

# Scaffold Directory Organization

## Objective
Create a predictable, domain-first structure that supports server actions, route-local UI, and shared infrastructure.

## Required structure
- `src/app/layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- `src/app/(_home)`, `src/app/(classes)`, `src/app/(students)`, `src/app/(appointments)`
- Each domain may include:
  - `_actions/`
  - `_components/`
  - `_context/` (only if domain-specific provider state is needed)
- Shared modules:
  - `src/app/lib/` for domain types/conversion/session helpers
  - `src/lib/` for runtime infra (Prisma client)
- Database:
  - `prisma/schema.prisma`
  - `prisma/seeds/` and `prisma/seeds/data/`

## Workflow
1. Create folder tree before code.
2. Add placeholder route `page.tsx` files for each domain.
3. Add `_actions` + `_components` per domain.
4. Add shared `lib` modules.
5. Verify no cross-domain deep imports; extract shared logic if needed.

## Guardrails
- Keep route file names semantic and Next.js-conventional.
- Do not put DB logic inside component folders.
- Do not place reusable infra inside route-local folders.
