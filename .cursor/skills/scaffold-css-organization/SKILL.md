---
name: scaffold-css-organization
description: Applies Soul Academy CSS conventions—Tailwind v4 globals.css layers (@theme, :root, @theme inline, components, utilities), next/font variables in fonts.ts, and body wiring in layout.tsx. Use when adding styles, theme tokens, fonts, or migrating CSS to Tailwind.
---

# Scaffold CSS Organization

## Prerequisites

Read `src/app/globals.css`, `src/app/lib/fonts.ts`, and `src/app/layout.tsx` before changing styling.

## Layer workflow (matches globals.css)

1. **Tailwind entry** — Keep `@import "tailwindcss"` first in `globals.css`.
2. **Breakpoints** — Adjust only inside `@theme`; preserve `--breakpoint-*: initial` reset; document px intent in comments.
3. **Semantic palette** — Add or change colors in `:root` first (`--primary`, `--screenWhite`, `--hoverNavLink`, etc.).
4. **Tailwind bridge** — Mirror palette and font roles in `@theme inline` as `--color-*` and `--font-*` so components can use `bg-primary`, `font-body`, `font-title`.
5. **Components layer** — Add repeated UI patterns here (`whiteBox`, `btn`, form rows, spinners) instead of duplicating inline styles across files.
6. **Utilities layer** — Add grade/type/priority tint classes (e.g. letter grades, HW/CW, behavior bands) as single-purpose utility classes.
7. **Body** — Keep `background`/`color` driven by CSS variables; align with `bg-screenWhite` / theme.

## Fonts workflow (matches fonts.ts + layout)

1. **Register** — In `fonts.ts`, use `next/font/google` with `variable: "--font-<name>"` (kebab-case token).
2. **Export** — One named export per face (camelCase).
3. **Wire** — Import all needed fonts in `layout.tsx` and add each `*.variable` to `<body>` class list.
4. **Map** — Ensure `@theme inline` maps semantic roles (`--font-title`, `--font-body`, …) to the matching `--font-*` variables.

## Decision guide

| Need | Where |
|------|--------|
| Layout/spacing/one-off | Tailwind classes in JSX |
| Shared buttons/forms/cards | `@layer components` in globals.css |
| Grade/behavior/status tints | `@layer utilities` in globals.css |
| New brand color | `:root` + `@theme inline` |
| New typeface | fonts.ts + layout body + `@theme inline` |

## Checklist

- [ ] No second copy of `globals.css` imports outside root layout.
- [ ] New CSS variables appear in both `:root` (or inline theme) and `@theme inline` when exposed to Tailwind.
- [ ] New font faces include `.variable` on `<body>` and a semantic slot in `@theme inline`.
- [ ] Route-specific `.css` files do not redefine global tokens; colocate only exceptional overrides.
