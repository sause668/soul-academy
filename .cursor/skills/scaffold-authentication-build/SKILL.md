---
name: scaffold-authentication-build
description: Implements Soul Academy style authentication with signup/login/logout server actions, JWT cookie sessions, role-aware session payloads, and protected route behavior. Use when building auth from scratch or refactoring auth/session flows.
---

# Scaffold Authentication Build and Organization

## Objective
Create a secure, role-aware authentication layer driven by server actions and cookie sessions.

## Required modules
- `src/app/lib/session.ts`
- `src/app/(_home)/_actions/user-actions.ts` (or equivalent auth action module)
- auth-capable forms/pages (`login`, `signup`, landing)

## Workflow
1. Define session payload contract (`userId`, `userRole`, `userRoleId`, `expiresAt`).
2. Implement JWT helpers:
   - `encrypt`, `decrypt`
   - `createSession`, `verifySession`, `updateSession`, `deleteSession`
3. Build auth actions:
   - signup with Zod validation + bcrypt hashing
   - login with credential check + role resolution
   - logout by deleting session cookie
4. Enforce page behavior:
   - public auth pages redirect authenticated users
   - protected pages verify session before data fetch
5. Return typed action responses consumable by UI forms.

## Guardrails
- All auth mutations occur server-side.
- Never expose plaintext passwords or hashes.
- Role checks must run in actions, not only in UI.
