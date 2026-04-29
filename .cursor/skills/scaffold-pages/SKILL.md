---
name: scaffold-pages
description: Scaffolds App Router pages/layouts for Soul Academy style domains with role-aware data loading, route-level loading/error states, and component composition. Use when creating new routes or reorganizing page boundaries.
---

# Scaffold Page Organization

## Objective
Produce lean route files that orchestrate data and compose domain UI.

## Required page responsibilities
- Resolve session/user context (where needed).
- Call domain server actions.
- Handle not-found/unauthorized/loading states.
- Render feature components with typed props.

## Route conventions
- Keep page logic in `page.tsx`; move heavy logic to actions/helpers.
- Keep global providers and shell in root `layout.tsx`.
- Add route-scoped `loading.tsx` and `error.tsx` when async UX requires it.

## Workflow
1. Define route contract (params, role, required data).
2. Fetch data via actions.
3. Map and pass props to domain components.
4. Handle empty/error states explicitly.
5. Add metadata and route-level polish.

## Guardrails
- Do not call Prisma directly from client components.
- Avoid duplicating data fetch logic in sibling pages.
- Keep redirects and access control explicit in page/server boundaries.
