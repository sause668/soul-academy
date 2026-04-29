---
name: scaffold-database-build
description: Designs and scaffolds a Prisma/PostgreSQL data layer modeled after Soul Academy domains (users, roles, courses, grades, behaviors, groups, appointments, announcements) with seeds and typed query contracts. Use when creating or evolving the database architecture.
---

# Scaffold Database Build and Organization

## Objective
Build a relational model with clear ownership boundaries and safe read/write contracts for server actions.

## Target outcomes
- `prisma/schema.prisma` contains normalized domain models and relations
- Prisma client generation configured and stable
- Seed files are domain-split and deterministic
- `src/lib/prisma.ts` exports a singleton Prisma client

## Workflow
1. Define domain entities and cardinality:
   - `User` + role tables (`Teacher`, `Student`, `Admin`)
   - `Course`, `Assignment`, `Grade`, `Behavior`, `Group`, `Appointment`, `Announcement`
2. Encode constraints:
   - unique user identifiers
   - relation integrity
   - composite keys for pair-unique entities (example: grades)
3. Generate client and verify import path consistency.
4. Implement seed strategy:
   - `prisma/seeds/data/*.ts` for data constants
   - `prisma/seeds/*.ts` for execution order and writes
5. Define safe query shapes:
   - use `select`/`omit`
   - map DB payloads into UI-safe objects

## Guardrails
- Never return password hashes to UI.
- Avoid schema changes without matching seed/type updates.
- Keep naming and relation directions consistent with domain language.
