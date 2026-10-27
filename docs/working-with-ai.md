# Working with the template

## First project

1. Install Node 24 LTS and npm; clone with `npx degit kjarisk/vibeTemplate my-app`, then `cd my-app && npm ci`.
2. Run `npm run dev`, open the URL shown in the terminal and inspect the starter.
3. Start Claude Code and run `/setup`. Describe the goal, audience, 3–7 flows, non-goals, data sensitivity and hosting. Review `docs/outline.md`, `docs/plan.md` and `docs/decisions.md`.
4. Optionally add visual references and run `/generate-visual-direction`. Use only images and data that you are permitted to share with your AI tool.
5. Ask: “Read the outline and plan. Propose the smallest useful first slice and its acceptance criteria.” Review and iterate.

## Everyday loop

Agree on a slice → inspect relevant code → implement → run relevant checks → review the diff → update plan/decisions → commit a working checkpoint. For code the usual checks are `npm run lint`, `npm test -- --run` and `npm run build`. Use `npm run dev` for visual work, and check keyboard and responsive behavior. `/review-changes` is useful before a commit. Report unrun checks and do not treat an AI review as proof of safety.

## Skills, rules and agents

- **Skills and commands** capture repeatable work: `/setup`, `/new-feature`, `/add-component`, `/add-route`, `/review-changes`, `/deploy`, `/audit-template`, `/sync-template`. Skills do not guarantee correctness. `/setup-skills` explains optional third-party tools.
- **Rules** in `.claude/rules/` load for matching paths. `CLAUDE.md` contains the working agreement; update it for your project.
- **Agents** in `.claude/agents/` are optional, bounded reviewers. Ask for `quality-reviewer` to inspect changes or `accessibility-reviewer` to inspect UI. They report findings; the main session implements and verifies fixes. Use one workstream by default; parallelize only independent work with a clear reason and consolidate the results.
- **MCP** is optional. Project servers require normal approval. The included GitHub server is read-only and needs a suitably scoped `GITHUB_PERSONAL_ACCESS_TOKEN` in the shell environment before starting Claude. Use `/mcp` to inspect status. GitHub writes require a separate deliberate configuration and authorization. Never commit tokens. Context7 is optional; `/setup-skills` describes current setup. Confirm organizational policy before sending data to any service.
- Confirm the installed Claude Code version and use `/help`, `/skills`, `/agents` or `/mcp` for the commands actually available. Product features and plan restrictions change.

## Suggested scenarios

- A course catalogue or React Forge companion with static lessons and browser-local progress.
- A golf drill library or workshop microsite using non-sensitive data.
- An internal DPO, SAM or subsurface UI prototype with fictitious data and an approved design system.
- A production SPA only after adding appropriate identity, server-side authorization, persistence, tests, accessibility, hosting, monitoring and operational ownership.

This is a React SPA starter, not an LMS, backend, native app, or complete enterprise platform. For a multi-user course system, add an approved backend, identity, roles, content/versioning, progress persistence, backups, privacy and operational support as separate planned slices.

## Memory, imports and scheduled work

- Claude Code memory and `CLAUDE.md` imports can add project context; review what is loaded with `/memory`. Imports are loaded into context, so use them deliberately. Do not store secrets or confidential client data in memory without approval. See [memory documentation](https://code.claude.com/docs/en/memory).
- Scheduled routines and background sessions can be useful for periodic research or checks where available. Start with an explicit scope, approved data, and a human review of results. Confirm plan, version and environment support in the [official documentation](https://code.claude.com/docs/en/scheduled-tasks).
- Built-in commands change over time: use `/help` and the [command reference](https://code.claude.com/docs/en/commands). The project-specific `/review-changes` leaves Claude Code's `/review` alias available for `/code-review`.
