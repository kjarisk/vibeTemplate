# Quickstart

Use Node 24 LTS and npm:

```bash
npx degit kjarisk/vibeTemplate my-app
cd my-app
npm ci
npm run dev
```

Start Claude Code in the project and run `/setup`. Review the scope and plan, then build one useful slice. For the full workflow and scenarios, see [working-with-ai.md](working-with-ai.md); for deployment and security, see [deploy.md](deploy.md).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build |
| `npm run lint` | Check lint without changing files |
| `npm run lint:fix` | Apply supported lint fixes deliberately |
| `npm test -- --run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |
| `npm run format:check` / `npm run format` | Check / apply formatting |
| `npm run preview` | Preview the production build |

## Project commands and skills

| Command | Purpose |
| --- | --- |
| `/setup` | Define project scope and plan |
| `/setup-skills` | Review optional external skills and documentation lookup |
| `/generate-visual-direction` | Summarize permitted visual references |
| `/new-feature <name>` / `/add-feature <name>` | Plan or scaffold a feature slice |
| `/add-component <name>` / `/add-route <name>` | Add a UI component or routing when needed |
| `/review-changes` / `/audit-template` | Review the changes or audit project health |
| `/lint` / `/test` / `/build` | Run project checks |
| `/deploy` | Plan a deployment |
| `/sync-template` | Review upstream changes without overwriting project work |
| `/bump-version` | Prepare a version update for review |

## Claude Code commands

Use `/help` for the commands available in your installed version and environment. Useful examples include `/skills`, `/agents`, `/mcp`, `/compact`, `/doctor`, `/doctor prompt-audit`, `/skill-doctor`, `/fast`, and `/desktop`. Availability depends on version, plan, platform and configuration; see the [official command reference](https://code.claude.com/docs/en/commands). `/skill-doctor` requires v2.1.252+ and feature-flag fetching; `prompt-audit` requires v2.1.283+; `/desktop` requires a Claude subscription on macOS or x64 Windows.

The included GitHub MCP server is read-only and requires the shell environment variable `GITHUB_PERSONAL_ACCESS_TOKEN`; approve it only if needed. See [Working with the template](working-with-ai.md) for integrations and privacy.
