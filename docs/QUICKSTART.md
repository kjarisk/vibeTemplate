# Quickstart

## 1. Clone the template

```bash
degit YOUR_USER/vibecoding-template my-app
cd my-app
npm i
```

## 2. Open in Claude Code

```bash
claude
```

Claude Code will automatically load `CLAUDE.md` for project context.

## 3. Configure your project

Run the interactive setup:

```
/setup
```

This will ask you about your app type, core features, non-goals, target user, and deployment target, then fill in `docs/outline.md`, `docs/plan.md`, and `docs/decisions.md`.

## 4. Add visual references (optional but recommended)

Drop screenshots or moodboard images into:
- `docs/moodboard/` — color palettes, typography samples, aesthetic references
- `docs/screenshots/` — UI inspiration, competitor designs

Then run:

```
/generate-visual-direction
```

This writes `docs/visual-direction.md` — a reusable summary Claude reads every session instead of re-analyzing images.

## 5. Install design skills (optional)

```
/setup-skills
```

Installs recommended Context7 design skills (`frontend-design`, `canvas-design`, etc.) into `.agents/skills/`.

## 6. Start building

Ask Claude:

```
Read docs/outline.md and docs/plan.md. Summarize the goal and propose the next single smallest task.
```

---

## npm scripts

```bash
npm run dev            # Start dev server at localhost:5173
npm run build          # TypeScript check + production build
npm run test           # Vitest watch mode
npm run test:coverage  # Vitest with coverage report
npm run lint           # ESLint check
npm run lint:fix       # ESLint auto-fix
npm run format         # Prettier format all files
npm run format:check   # Prettier check (no write)
npm run preview        # Preview production build locally
```

---

## Claude Code commands

### Built-in (always available)

| Command | What it does |
|---------|-------------|
| `/compact` | Summarize conversation + free up context — **use this often in long sessions** |
| `/rewind` | Roll back conversation and code to an earlier checkpoint |
| `/branch` | Explore an alternative approach without losing current state |
| `/model haiku` | Switch to faster/cheaper model for simple tasks |
| `/model sonnet` | Switch back to default model |
| `/effort low` | Less reasoning (faster, cheaper) |
| `/effort high` | More reasoning (slower, for complex problems) |
| `/memory` | View or edit Claude's persistent memory |
| `/install-github-app` | Connect Claude to GitHub for PR reviews |
| `/mcp` | Manage MCP server connections |

### Custom (this template)

| Command | What it does |
|---------|-------------|
| `/setup` | Interactive project bootstrap |
| `/audit-template` | 12-category health check with scored report |
| `/bump-version` | Changelog + App.tsx + package.json + tag + push |
| `/lint` | Run ESLint + auto-fix |
| `/test` | Run tests with coverage |
| `/build` | Type-check and production build |
| `/new-feature <name>` | Scaffold feature slice |
| `/review` | Review recent changes |
| `/deploy` | AI-guided deployment setup |
| `/setup-skills` | Check and install recommended skills |
| `/generate-visual-direction` | Generate visual direction from images |

---

## Optional features

Install when your project needs them:

```bash
# Multi-page routing
npm install react-router

# Forms with validation
npm install react-hook-form zod @hookform/resolvers

# Toast notifications
npm install sonner

# shadcn/ui components (install individually as needed)
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
# ... etc
```

---

## Deploy

Run `/deploy` in Claude Code for guided setup, or see `docs/deploy.md` for full reference.

**Options:**
- **GitHub Pages** — free, great for open-source (run `/deploy` → choose option 1)
- **Vercel** — zero-config, preview deployments (run `/deploy` → choose option 3)
- **Linode VPS** — full control, rsync + Nginx (run `/deploy` → choose option 2)

---

## Path aliases

Use `@/` to import from `src/`:

```tsx
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

---

## MCP servers

This template includes `.mcp.json` with:
- **Context7** — skills registry and documentation lookup
- **GitHub** — PR management, issue tracking (requires `GITHUB_PERSONAL_ACCESS_TOKEN` env var)

To add more MCP servers:

```bash
claude mcp add <name> -- npx -y <package>
```

Or edit `.mcp.json` directly.

---

## Tips for effective Claude Code sessions

- **Keep tasks small** — one feature, one fix, one refactor at a time
- **Use `/compact` often** — when the conversation gets long, compact it to keep Claude focused
- **Cite the outline** — before coding, always confirm which bullet in `docs/outline.md` this supports
- **Commit often** — after every working slice, not just at the end
- **Update the docs** — check off `docs/plan.md` and `docs/outline.md` after each completed task

See `docs/learning.md` for a comprehensive guide to all Claude Code features.
See `docs/getting-started.md` for the step-by-step first-day walkthrough (this file is deleted by `/setup` on new projects).
