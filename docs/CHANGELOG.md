# Changelog

All notable changes to this vibecoding template are recorded here.

Format: `[version] YYYY-MM-DD — summary`
Types: `Added` · `Changed` · `Fixed` · `Removed` · `Decision`

---

## [0.6.2] 2026-04-14 — Post-setup cleanliness check in /audit-template

### Added
- Section 11 in `/audit-template`: post-setup cleanliness — verifies `/setup` ran completely and no template fingerprints survived into a new project (App.tsx, test, README, index.html, package name, decisions, getting-started.md)

---

## [0.6.1] 2026-04-14 — Complete template noise removal on /setup

### Fixed
- `/setup` now also replaces `README.md`, `src/App.test.tsx`, and deletes `docs/getting-started.md` — these carried template identity into new projects
- `src/App.test.tsx` was testing for a heading that no longer exists after App.tsx is replaced

---

## [0.6.0] 2026-04-14 — Versioning, release workflow, audit + setup improvements

### Added
- `/bump-version` command — updates CHANGELOG, App.tsx, package.json, commits, tags, and pushes in one pass
- Changelog sync check in `/audit-template` — warns when CHANGELOG.md and App.tsx changelog array are out of sync
- `docs/CHANGELOG.md` and "What's new" tab on startup page

### Changed
- `/setup` Step A: backend/game skill installs now do a live `ctx7 skills search` instead of hardcoded unverified registry paths
- `docs/skills.md`: verified skills clearly labelled, backend/game skills marked as search-live

### Fixed
- Unverified skill registry paths removed from `/setup` (backend-architect, game-development etc. don't exist)

---

## [0.5.0] 2026-04-14 — Full Claude Code migration + dependency refresh

### Added
- `CLAUDE.md` — new agent instruction file (replaces AGENTS.md). Lazy loading strategy, React 19 patterns, no-cast TypeScript rule, npm-only rule, parallel execution guidance
- `.claude/settings.json` — model, permissions (allow/deny), PostToolUse lint hook
- `.mcp.json` — MCP server config for Context7 and GitHub (moved out of settings.json)
- `.claude/commands/setup.md` — interactive project bootstrap: asks all 8 questions in one message, installs domain-appropriate skills (frontend/backend/fullstack/game/mobile), writes outline.md + plan.md + decisions.md in one pass
- `.claude/commands/audit-template.md` — 11-category health audit with scored report, token efficiency estimate, and package currency check
- `.claude/commands/deploy.md` — guided deployment for all 3 targets: GitHub Pages, Vercel, Linode VPS
- `.claude/commands/setup-skills.md` — check and install Context7 design skills
- `docs/learning.md` — comprehensive Claude Code features reference
- `docs/getting-started.md` — step-by-step first-day walkthrough
- `docs/deploy.md` — expanded to cover GitHub Pages, Vercel, and Linode
- `src/components/ui/tabs.tsx` — shadcn/ui Tabs component
- Startup page tab 2 "How it works" — stack, commands, docs map
- `--accent-glow: oklch(0.65 0.18 265)` CSS variable for visible gradient animation

### Changed
- Startup page redesigned: fixed steps (01–04 match real workflow), gradient now visible (indigo/violet accent), ambient glow radials added
- `docs/outline.md` — minimal placeholder with sentinel text for new-project detection
- `docs/plan.md` — Phase 0 no longer lists already-scaffolded work
- `docs/visual-direction.md` — shrunk from verbose multi-line to single-line placeholder (token savings)
- `docs/skills.md` — corrected registry paths (`/anthropics/skills`, `--universal -y`, one skill at a time)
- `docs/decisions.md` — replaced hardcoded dates with `YYYY-MM-DD` placeholders
- `docs/QUICKSTART.md` — full rewrite: setup flow, npm scripts, both built-in and custom commands, MCP section
- `README.md` — full rewrite: references CLAUDE.md (not AGENTS.md), all 3 deployment options
- `tsconfig.app.json` — removed deprecated `baseUrl`, kept only `paths` with `./src/*` (TS 6.0 clean)
- All packages updated to latest: vite 8, TypeScript 6, eslint 10, lucide-react 1.x, jsdom 29, shadcn 4

### Fixed
- `.claude/settings.json` hook had hardcoded absolute machine path — removed, now uses `npm run lint:fix` directly
- `docs/learning.md` URLs pointed to `code.claude.com` (doesn't exist) — fixed to `docs.anthropic.com/en/docs/claude-code/`
- `ctx7` install commands used `--output` flag (doesn't exist) — fixed to `--universal`
- `/setup` asked questions sequentially (7 round-trips) — rewrote to ask all at once
- Gradient animation was invisible: `--primary` had zero chroma, animated black→black — added accent-glow with chroma
- `@testing-library/dom` peer dep removed during vite 8 upgrade — restored

### Removed
- `AGENTS.md` — wrong convention for Claude Code (was 203 lines)
- `opencode.json` — OpenCode config, silently ignored by Claude Code
- `.opencode/` directory — entire OpenCode commands/skills dir migrated to `.claude/`
- `/agentskills-community/agentskills` registry references — doesn't exist, replaced with `/anthropics/skills`
- `frontend-ui-ux` and `web-design-guidelines` skill references — not in registry, replaced with `canvas-design` and `interaction-design`

### Decision
- Chose lazy loading for docs: Claude reads on demand, not upfront — saves ~300 tokens/session
- MCP config belongs in `.mcp.json`, NOT in `settings.json` — common mistake, now enforced
- `baseUrl` removed from tsconfig — deprecated in TS 6, `paths` alone works in bundler mode
- ctx7 only installs one skill at a time — all install commands updated to one-per-line

---

## [0.4.0] 2026-03-XX — Deployment + visual reference workflow

### Added
- `docs/deploy.md` — Linode VPS deployment guide (rsync + SSH + Nginx)
- `.claude/commands/deploy.md` — guided deploy command
- Visual reference workflow: `docs/moodboard/`, `docs/screenshots/`, `/generate-visual-direction`
- New project detection guard in agent rules

### Changed
- Setup flow updated to ask about deployment target

---

## [0.3.0] 2026-02-XX — Skills system

### Added
- `.claude/skills/add-feature/` — scaffold feature slice
- `.claude/skills/add-component/` — add shadcn/ui component
- `.claude/skills/add-route/` — add React Router route
- `docs/skills.md` — skills reference

---

## [0.2.0] 2026-02-XX — shadcn/ui + base components

### Added
- shadcn/ui (new-york style) with base components: Button, Card, Badge, Input, Separator
- Path alias `@/` for `src/`
- TanStack Query + Zustand configured

---

## [0.1.0] 2026-02-XX — Initial scaffold

### Added
- Vite + React 19 + TypeScript scaffold
- Tailwind CSS v4
- Vitest + Testing Library
- ESLint + Prettier
- `docs/outline.md`, `docs/plan.md`, `docs/decisions.md` placeholders
