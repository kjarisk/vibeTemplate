---
description: Define a new React SPA project's scope and first delivery plan.
disable-model-invocation: true
---

Help the user configure a project based on this React/Vite/TypeScript SPA scaffold. Backend, database, login, native mobile, and SSR are not included; if needed, document the gap and discuss an appropriate architecture before implementation.

Ask together for: project name; audience and goal; 3–7 core flows; non-goals; data classification and whether mock data is sufficient; target hosting; visual references; and optional routing/forms/auth/storage needs. Accept a partial answer and propose reasonable assumptions, distinguishing decisions from open questions.

Before replacing files, inspect them. If the project already has content or is no longer an unconfigured template, show what would be replaced and ask how to preserve it. Do not delete existing docs or rewrite source code blindly. Do not install external skills or dependencies automatically.

After the user answers:
1. Update `docs/outline.md` with goals, audience, flows, non-goals, data classification and measurable acceptance criteria.
2. Update `docs/plan.md` with a small first working slice, checks, and later slices. Include loading/error/empty states only where applicable. Record missing backend, hosting, security or identity work explicitly.
3. Record actual decisions and unresolved questions in `docs/decisions.md`; don't claim packages or services are installed until verified.
4. For a fresh clone only, propose replacing the starter page and its test with a small named project shell and an assertion that checks the visible project heading. Update `index.html`, README and package name together; if the package name changes, update the lockfile too. Preserve existing work.
5. Summarize the result and suggest the next single slice. Explain that `/setup-skills` and MCP are optional; review sources before installing or enabling them.

For client work, use only approved data, models, integrations and hosting. A static SPA alone cannot enforce authorization.
