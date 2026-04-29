---
name: scaffold-server-actions
description: Scaffolds domain server actions for data reads/mutations with validation, session/role checks, Prisma queries, and typed return contracts. Use when implementing new domain logic under src/app/**/_actions.
---

# Scaffold Server Action Organization

## Objective
Implement maintainable server actions that are secure, typed, and domain-local.

## File placement
- Place actions in route-group `_actions` folders.
- Group by domain (`course-actions.ts`, `appointment-actions.ts`, `student-actions.ts`).

## Action template
1. Validate input (Zod/shared schema).
2. Verify session and derive authority context.
3. Execute Prisma query/mutation.
4. Map result to safe shape.
5. Return typed result or typed error payload.

## Read actions
- Prefer `select`/`omit` over broad includes.
- Normalize nested relations into UI-friendly contracts.
- Apply caching directives and tags for expensive reads.

## Write actions
- Enforce ownership/role constraints before mutation.
- Keep mutation transactionally safe where multi-write operations exist.
- Trigger invalidation/revalidation after writes.

## Guardrails
- No browser-only APIs in actions.
- No hidden throw chains that bypass typed UI error handling.
- Avoid duplicate mapping logic; extract helpers when repeated.
