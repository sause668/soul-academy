---
name: scaffold-modals
description: Implements modals using ModalProvider and portal Modal from Modal.tsx, OpenModalComponents triggers, and root layout wiring. Use when adding dialogs, forms in overlays, or table-driven modal opens across Soul Academy routes.
---

# Scaffold Modals (Global Modal System)

## Files to respect

- `src/app/(_home)/_context/Modal.tsx` — provider, portal, `useModal`
- `src/app/layout.tsx` — `ModalProvider` + `<Modal />`
- `src/app/(_home)/_components/OpenModalComponents/` — reusable openers

## Workflow

### 1. Confirm shell exists

Root layout should already wrap with `ModalProvider` and render `<Modal />` after `{children}`. Do not add another provider or duplicate `<Modal />`.

### 2. Build the modal body

- Create a component under the feature tree (e.g. `src/app/(classes)/_components/.../Modals/MyModal.tsx`).
- Use `"use client"` when the modal uses state, effects, or event handlers.
- Style the **inner** UI (padding, forms, buttons). The outer shell (backdrop, border, max width) comes from `Modal.tsx`’s `#modal-content` wrapper.

### 3. Open from UI

**Preferred:** use `OpenModalButton` or `OpenModalTableCell`:

```tsx
<OpenModalButton
  buttonText="Add item"
  modalComponent={<MyModal user={user} />}
  cssClasses="btn"
  onModalClose={() => { /* refresh or reset */ }}
/>
```

Match prop names: `modalComponent`, `buttonText` / `cellText`, optional `onButtonClick`, `onModalClose`, `cssClasses`.

### 4. Close behavior

- Backdrop click runs `closeModal` (defined on context).
- To run logic after close, pass `onModalClose` into the opener so it is registered before content is set (same order as `OpenModalButton`).

### 5. New trigger variant

If you need a non-button/table-cell opener, copy the pattern from `OpenModalButton.tsx`: get `setModalContent` and `setOnModalClose` from `useModal`, optional `setOnModalClose(onModalClose)`, then `setModalContent(...)`.

## Checklist

- [ ] Only one global `<Modal />` in `layout.tsx`
- [ ] No `useModal` usage outside `ModalProvider`
- [ ] Feature modal lives under domain `Modals/` when applicable
- [ ] Openers follow `OpenModalButton` / `OpenModalTableCell` API unless a new pattern is justified
