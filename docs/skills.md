# Skills

Skills are reusable prompt templates that extend Claude Code's capabilities. They follow the [Agent Skills](https://agentskills.io) open standard.

---

## How skills work in Claude Code

A skill is a directory containing a `SKILL.md` file with YAML frontmatter. Claude Code auto-loads skills when their `description` matches the current task, or you invoke them manually via `/skill-name`.

Skills live in two places:

| Location | Purpose |
|----------|---------|
| `.agents/skills/` | Third-party skills from the Context7 registry (gitignored, install locally) |
| `.claude/skills/` | Project-specific skills (committed, shared with team) |

---

## Installing third-party skills

Skills are managed with the Context7 CLI (`ctx7`). No global install needed:

```bash
# Search the registry
npx ctx7 skills search <keyword>

# Install a specific skill
npx ctx7 skills install /org/repo <skill-name>

# Install multiple at once
npx ctx7 skills install /org/repo skill-a skill-b skill-c

# Auto-suggest based on your package.json
npx ctx7 skills suggest

# List currently installed skills
npx ctx7 skills list
```

Or run `/setup-skills` in Claude Code for interactive guided install.

---

## Recommended skills for this stack

These skills work well for React + Vite + Tailwind + shadcn/ui projects:

### Verified (confirmed to exist in the registry)

| Skill | Registry | Stars | What it does |
|-------|----------|-------|-------------|
| `frontend-design` | `/anthropics/skills` | ★★★★ | Production-grade UI with bold aesthetic direction, avoids generic AI aesthetics |
| `canvas-design` | `/anthropics/skills` | ★★★☆ | Canvas and visual design system work |
| `interaction-design` | `/wshobson/agents` | ★☆☆☆ | Interaction patterns, motion, UX flows |

Install individually (ctx7 installs one skill at a time):

```bash
# Install to .agents/skills/ (gitignored, universal format)
npx ctx7 skills install /anthropics/skills frontend-design --universal -y
npx ctx7 skills install /anthropics/skills canvas-design --universal -y
npx ctx7 skills install /wshobson/agents interaction-design --universal -y
```

Or run `/setup-skills` in Claude Code for interactive guided install.

### Backend, API, and game skills — search live

Backend and game skill paths are **not hardcoded** here because the registry changes and unverified paths may not exist. Always search first:

```bash
# For backend / fullstack projects
npx ctx7 skills search backend
npx ctx7 skills search api

# For game projects
npx ctx7 skills search game
```

Review the results, then install only confirmed skills one at a time:

```bash
npx ctx7 skills install /org/repo <skill-name> --universal -y
```

> **Note:** The registry is community-maintained. Use `npx ctx7 skills search <keyword>` to find current options. Prefer skills from `/anthropics/skills` (Trust: High, verified source).

---

## Project-specific skills (`.claude/skills/`)

These are committed to the repo — no installation needed:

| Skill | Invoke | When to use |
|-------|--------|-------------|
| `add-feature` | `/new-feature <name>` | Scaffold a new feature slice under `src/features/<name>/` |
| `add-component` | `/add-component <name>` or describe it | Add a shadcn/ui component or custom reusable component |
| `add-route` | `/add-route <name>` or ask for routing | Add React Router and configure a new route/page |

---

## Skill frontmatter reference

Skills in `.claude/skills/*/SKILL.md` support these frontmatter fields:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name (lowercase, hyphens, numbers only) |
| `description` | string | When Claude should use this skill (used for auto-suggestion) |
| `when_to_use` | string | Additional context for invocation |
| `allowed-tools` | string | Space-separated tools the skill can use without prompts |
| `argument-hint` | string | Hint shown in autocomplete (e.g. `<feature-name>`) |
| `user-invocable` | boolean | Whether the skill appears in the `/` menu (default: true) |
| `disable-model-invocation` | boolean | Prevent Claude from auto-loading this skill |
| `context` | string | Set to `fork` to run in an isolated sub-agent |
| `agent` | string | Sub-agent type when `context: fork` (e.g. `general-purpose`) |
| `model` | string | Override model for this skill |
| `effort` | string | Override effort: `low`, `medium`, `high`, `max` |

---

## Further reading

- Claude Code skills docs: https://code.claude.com/docs/en/skills
- Context7 skills registry: https://context7.com/skills
- Agent Skills open standard: https://agentskills.io
