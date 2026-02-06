# Vibecoding Template (React + Vite)

This repo is designed for AI-assisted development with strong guardrails.

## How to work

1. Update `/docs/outline.md` (scope) and `/docs/plan.md` (vertical slices).
2. Follow `AGENTS.md` strictly.
3. Implement one small task at a time.
4. Run tests + lint before every checkpoint commit.

## Tech

- React + Vite + TypeScript
- Tailwind CSS
- TanStack Query (server state)
- Zustand (client/UI state)
- shadcn/ui by default (Tailwind UI optional)

## Rule of thumb

If it’s not in `/docs/outline.md`, we don’t build it.
