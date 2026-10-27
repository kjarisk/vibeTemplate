# Project instructions

This repository starts as a React + Vite + TypeScript single-page application. Follow the user's explicit instructions and the project's policies. Do not assume a backend, authentication, private hosting, or production readiness exists.

## Working agreement

- For a new project, offer `/setup`; read `docs/outline.md` and `docs/plan.md` when planning or implementing. Treat the outline as the agreed scope. If the user requests a change, discuss its effect and update the scope rather than silently expanding it.
- Deliver small end-to-end slices. State assumptions and acceptance criteria. Record meaningful decisions in `docs/decisions.md` and mark work complete only when verified.
- Inspect existing code before changing it. Keep changes focused. Ask before adding dependencies or changing deployment, authentication, data persistence, or security boundaries.
- Preserve secrets and customer data. Never put secrets in frontend code, Git, prompts or screenshots. Use mock or approved data for prototypes; enforce access control on the server for real data.
- Use current official docs when behavior is uncertain. MCP servers and downloaded skills are optional: inspect their source, permissions, and data handling before enabling them.
- Use one main workstream by default. Delegate independent, clearly bounded tasks only when useful; avoid overlapping edits, excessive parallelism, and unnecessary context switching. Consolidate and review every result.

## Stack and architecture

- Default: React, Vite, TypeScript, Tailwind, shadcn/ui, TanStack Query, Zustand, Vitest. Adapt the stack deliberately; it is not a backend or native-mobile scaffold.
- Group feature-specific code in `src/features/<name>`; share only when useful. Prefer local state, props or context for simple needs; use Zustand when shared UI state warrants it. Use TanStack Query for server-state caching where appropriate.
- For async UI, provide loading, error and empty states as applicable. If using React `use()` with promises, use a stable cached promise with suitable Suspense and error boundaries.
- Use strict types; avoid unjustified `any` and unsafe casts. Consider keyboard use, semantic HTML, labels, contrast, focus, responsive layout and reduced motion.
- Do not run broad auto-fixes silently. Review the diff before committing. Run checks appropriate to the change; for code, normally `npm run lint`, `npm test -- --run`, and `npm run build`. Report failures and unrun checks.

## Reference

- `docs/QUICKSTART.md`: commands and first steps.
- `docs/working-with-ai.md`: daily workflow, skills, agents and safe collaboration.
- `docs/deploy.md`: hosting and production checklist.
- `.claude/skills/`: project skills; `.claude/agents/`: optional bounded reviewers; `.claude/rules/`: path-scoped conventions.
- Read `docs/visual-direction.md` when making visual decisions, if it contains a project brief.
