---
name: scaffold-components
description: Builds route-scoped React components (dashboards, lists, cards, modals, nav) using Tailwind, typed props, and clear client/server boundaries. Use when implementing or refactoring src/app/**/_components trees.
---

# Scaffold Component Organization

## Objective
Create composable feature UI with strict boundaries and predictable naming.

## Component strategy
- Build from small units: `Header`, `List`, `Item`, `Modal`, `Form`.
- Keep feature components in route-local `_components`.
- Move reused primitives to shared component locations only when reuse is proven.

## Data and props
- Accept typed props from `src/app/lib/definitions.ts`.
- Keep formatting/conversion logic in helper modules, not inline everywhere.
- Let parent boundary pass pre-validated, safe data.

## Client/server split
- Mark files with `"use client"` only when interactive behavior exists.
- Keep server-only logic out of interactive components.
- Use server actions as the write interface.

## Styling
- Prefer Tailwind classes.
- Remove stale CSS imports during migration.
- Keep visual patterns consistent across domains (spacing, cards, controls).

## Guardrails
- Avoid mega-components; split at clear UI seams.
- Keep modal logic close to owning feature.
- Keep naming explicit (for example, `StudentBehavior`, `StudentGroup`).
