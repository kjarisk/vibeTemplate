# Vibecoding Template (React + Vite)

A production-ready starter template for AI-assisted development with Claude Code. Built with strong guardrails, vertical slice architecture, and everything you need to ship fast without losing control of scope.

## Quick start

```bash
degit YOUR_USER/vibecoding-template my-app && cd my-app && npm i
```

Then open Claude Code and run `/setup` — it will guide you through defining your project scope, deployment target, and optional features.

## How it works

1. **Define scope** — run `/setup` to fill `docs/outline.md` (scope lock) and `docs/plan.md` (vertical slices)
2. **Add visual references** — drop screenshots into `docs/moodboard/` or `docs/screenshots/`, run `/generate-visual-direction`
3. **Install skills** — run `/setup-skills` to add recommended design skills
4. **Build** — ask Claude: *"Read docs/outline.md and propose the next smallest task"*
5. **Iterate** — implement one task, run tests, commit, repeat

## Rule of thumb

If it's not in `docs/outline.md`, we don't build it.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + Vite + TypeScript |
| Styling | Tailwind CSS v4 (CSS variables, no config file) |
| UI components | shadcn/ui (new-york style) |
| Server state | TanStack Query v5 |
| Client/UI state | Zustand v5 |
| Testing | Vitest + Testing Library |
| Icons | Lucide React |

**Optional (install when needed):** React Router · React Hook Form + Zod · Sonner

## Project structure

```
src/
  components/ui/      # shadcn/ui primitives (don't modify without reason)
  components/         # shared reusable UI
  features/<name>/    # feature slices (components, api, state, types)
  hooks/              # shared custom hooks
  lib/                # utilities (cn(), etc.)
docs/
  outline.md          # scope lock — single source of truth
  plan.md             # phased implementation plan
  decisions.md        # architecture decision log
  deploy.md           # deployment guide (GitHub Pages / Linode / Vercel)
  skills.md           # skills reference + install guide
  prompts.md          # reusable AI prompts
  learning.md         # Claude Code feature guide with references
  visual-direction.md # generated visual summary (run /generate-visual-direction)
  moodboard/          # drop color/typography reference images here
  screenshots/        # drop UI inspiration images here
.claude/
  CLAUDE.md           # loaded automatically — (see CLAUDE.md at root)
  settings.json       # model, permissions, hooks
  commands/           # custom slash commands
  skills/             # project-specific skills
.mcp.json             # MCP server config (Context7, GitHub)
```

## Available commands

### Built-in Claude Code commands

| Command | What it does |
|---------|-------------|
| `/compact` | Summarize conversation + free up context (use often in long sessions) |
| `/rewind` | Roll back conversation and code changes to an earlier point |
| `/branch` | Explore an alternative approach without losing current state |
| `/model haiku` | Switch to faster model for simple tasks |
| `/effort high` | Use max reasoning for complex problems |
| `/memory` | View or edit Claude's memory |
| `/install-github-app` | Connect Claude to GitHub for PR reviews |

### Custom commands (this template)

| Command | What it does |
|---------|-------------|
| `/setup` | Interactive project bootstrap — fills outline, plan, decisions |
| `/lint` | Run ESLint + auto-fix |
| `/test` | Run Vitest with coverage report |
| `/build` | TypeScript check + Vite production build |
| `/new-feature <name>` | Scaffold a feature slice under `src/features/<name>/` |
| `/review` | Review recent changes for quality and scope issues |
| `/deploy` | AI-guided deployment setup (GitHub Pages / Linode / Vercel) |
| `/setup-skills` | Check and install recommended Context7 design skills |
| `/generate-visual-direction` | Extract visual direction from moodboard/screenshot images |

## npm scripts

```bash
npm run dev            # localhost:5173
npm run build          # TypeScript check + Vite production build
npm run test           # Vitest watch mode
npm run test:coverage  # Vitest with coverage report
npm run lint           # ESLint check
npm run lint:fix       # ESLint auto-fix
npm run format         # Prettier format all files
npm run format:check   # Prettier check (no write)
npm run preview        # Preview production build locally
```

## Deployment

Three options covered in `docs/deploy.md` and the `/deploy` command:

- **GitHub Pages** — free, zero-config, great for open-source
- **Vercel** — zero-config, preview deployments, great DX
- **Linode VPS** — full control, rsync + SSH + Nginx + Certbot

## Documentation

| File | Purpose |
|------|---------|
| [CLAUDE.md](CLAUDE.md) | Agent rules — loaded automatically by Claude Code |
| [docs/outline.md](docs/outline.md) | Scope lock — what to build |
| [docs/plan.md](docs/plan.md) | Phased implementation plan |
| [docs/decisions.md](docs/decisions.md) | Architecture decision log |
| [docs/deploy.md](docs/deploy.md) | Deployment guide (3 options) |
| [docs/skills.md](docs/skills.md) | Skills reference + install guide |
| [docs/prompts.md](docs/prompts.md) | Reusable prompts for common workflows |
| [docs/learning.md](docs/learning.md) | Claude Code features learning guide |
| [docs/QUICKSTART.md](docs/QUICKSTART.md) | Setup + commands cheat sheet |
