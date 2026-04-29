---
name: build-soul-academy-app
description: End-to-end workflow for building a Soul Academy style school-management app from scratch, covering directories, database, authentication, server actions, components, and pages. Use when bootstrapping a similar application.
---

# Build Soul Academy App

## Objective
Deliver a production-ready baseline app using this architecture and implementation order.

## Build order checklist
- [ ] 1) Directory organization
- [ ] 2) Database build and seed setup
- [ ] 3) Authentication/session implementation
- [ ] 4) Server action layer by domain
- [ ] 5) Component layer by feature
- [ ] 6) Page and route composition

## Step details

### 1) Directory organization
- Follow `.cursor/skills/scaffold-directory-organization/SKILL.md`.
- Create all route groups and domain folders before writing logic.

### 2) Database build
- Follow `.cursor/skills/scaffold-database-build/SKILL.md`.
- Define schema relations first, then seed data modules, then generation flow.

### 3) Authentication build
- Follow `.cursor/skills/scaffold-authentication-build/SKILL.md`.
- Establish session helpers before login/signup UI wiring.

### 4) Server actions
- Follow `.cursor/skills/scaffold-server-actions/SKILL.md`.
- Implement one domain at a time; lock authorization in each action.

### 5) Components
- Follow `.cursor/skills/scaffold-components/SKILL.md`.
- Build composable sections and modal flows from typed data contracts.
- For dialogs/overlays, follow `.cursor/skills/scaffold-modals/SKILL.md` (`ModalProvider`, single `<Modal />`, `OpenModalComponents`).

### 6) Pages
- Follow `.cursor/skills/scaffold-pages/SKILL.md`.
- Keep pages orchestration-only; all heavy logic remains outside route files.

## Done criteria
- Roles can authenticate and reach correct dashboards.
- Core domain reads/writes work through server actions.
- Routes render with loading/error fallbacks.
- Types, schema, and UI contracts stay aligned.
