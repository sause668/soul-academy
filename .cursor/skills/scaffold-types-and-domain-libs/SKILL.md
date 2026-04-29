---
name: scaffold-types-and-domain-libs
description: Adds or refactors shared TypeScript types, Zod form schemas, and pure domain helpers following definitions.ts and grading.ts patterns. Use when introducing entities, forms, grade/behavior logic, or formatting helpers under src/app/lib.
---

# Scaffold Types and Domain Libraries

## Reference files

- `src/app/lib/definitions.ts` — entities, DTOs, session types, Zod form schemas + form state types.
- `src/app/lib/grading.ts` — numeric/text grading, behavior scores, sorting, priority lists (pure functions).

## Adding entity types

1. Add an `export interface` under a `// … Definitions` comment block near related models (mirror Prisma/domain language).
2. If the UI submits a form for this entity, add:
   - `export const MyEntityFormSchema = z.object({ … })`
   - `export type MyEntityFormState = { errors: string[]; properties?: { … } } | undefined`
3. Reuse `ActionResponse` or existing aggregate types (`CourseData`, `GradebookData`) when bundling server results.

## Adding form validation

- Colocate `FormSchema` and `FormState` with the entity or feature section in `definitions.ts`.
- Use the same field-level error shape as existing forms so actions can return `z.treeifyError` results consistently.

## Adding domain logic

### Grading / behavior / sorting

- Implement in `grading.ts` when it fits existing responsibilities (final grades, letter grades, behavior labels, student ordering).
- Start with private helpers, export only what routes and components need.
- Return primitive values or small objects typed via `definitions.ts` (`PriorityStudentGroups`, etc.).

### Formatting (dates, strings) or cross-cutting helpers

- Put in `typeConversion.ts` (or extend it), not `grading.ts`.

### New domain (not grading)

- Create `src/app/lib/<feature>-helpers.ts` with pure functions and types imported from `definitions.ts` if `grading.ts` would become unrelated clutter.

## Checklist

- [ ] Types/schemas live in `definitions.ts` unless truly file-local.
- [ ] Pure math and ranking logic stays out of React components and server actions when reusable.
- [ ] `grading.ts` stays free of React, Prisma, and `next/*` imports.
- [ ] New CSS-facing string returns from grading helpers match utility class names in `globals.css` when used for styling.
