# Claude Code Learning Guide

A comprehensive reference for all the Claude Code features used in this template — with links, examples, and explanations of why each feature matters.

---

## 1. CLAUDE.md — Project Context

**What it is:** A markdown file Claude Code reads automatically at the start of every session. It's the primary way to give Claude persistent project-specific context.

**Where it lives:** Root of the repo (`CLAUDE.md`) or inside `.claude/CLAUDE.md`.

**Best practices:**
- Keep it under 200 lines — everything should earn its place
- Only include rules Claude would get wrong without explicit guidance
- Don't include things Claude already knows (standard patterns, common sense)
- Ask yourself: "Would Claude make a mistake without this line?"

**What to include:**
- Build/test/run commands
- Project-specific architecture decisions
- Non-obvious naming conventions
- Constraints the AI must respect (scope lock, package manager, etc.)
- React version-specific patterns (this template uses React 19)

**What NOT to include:**
- Standard tech stack descriptions (Claude already knows React)
- Exhaustive code style rules (use a linter for that)
- Things already enforced by hooks

**Official docs:** https://docs.anthropic.com/en/docs/claude-code/best-practices

---

## 2. `.claude/settings.json` — Configuration

**What it is:** The main configuration file for Claude Code behavior in your project.

**Key sections:**

```json
{
  "model": "claude-sonnet-4-6",
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(git commit *)"],
    "deny": ["Bash(rm -rf *)", "Bash(git push --force*)"],
    "defaultMode": "default"
  },
  "hooks": { ... }
}
```

**Permission rule formats:**
- `Bash(npm run *)` — allow any npm script
- `Bash(git commit *)` — allow git commits
- `Read(/src/**)` — allow reading src directory
- `mcp__servername__toolname` — MCP tool permissions
- Evaluation order: **deny → ask → allow** (first match wins)

**defaultMode options:**
- `default` — prompts for permission on first use
- `acceptEdits` — auto-accepts file edits for working directory
- `plan` — read-only mode (analyze but not modify)
- `auto` — auto-approves with safety checks

**Official docs:** https://docs.anthropic.com/en/docs/claude-code/settings | https://docs.anthropic.com/en/docs/claude-code/permissions

---

## 3. Hooks — Automated Enforcement

**What it is:** Shell commands that run automatically in response to Claude Code events. Unlike instructions in CLAUDE.md (which Claude can ignore), hooks are **enforced by the harness**.

**Why use hooks:** Instead of asking Claude to run `npm run lint:fix` after every file change, a hook does it automatically every time.

**Available hook events (28 total):**

| Event | When it fires |
|-------|--------------|
| `PreToolUse` | Before any tool executes (can block) |
| `PostToolUse` | After a tool succeeds |
| `PostToolUseFailure` | After a tool fails |
| `SessionStart` | When a session begins or resumes |
| `SessionEnd` | When a session ends |
| `UserPromptSubmit` | Before user prompt is processed |
| `Stop` | When Claude finishes responding |
| `SubagentStart` | When a sub-agent is spawned |
| `SubagentStop` | When a sub-agent finishes |
| `PreCompact` | Before context compaction |
| `PostCompact` | After context compaction |
| `FileChanged` | When a watched file changes |
| `WorktreeCreate` | When a git worktree is created |
| `WorktreeRemove` | When a git worktree is removed |
| `Notification` | When Claude sends a notification |
| `TaskCreated` / `TaskCompleted` | Task lifecycle |
| `ConfigChange` | When config file changes |
| `CwdChanged` | When working directory changes |

**Hook handler types:** `command`, `http`, `prompt`, `agent`

**Example — auto-lint on file write:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint:fix --silent 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

**Official docs:** https://docs.anthropic.com/en/docs/claude-code/hooks

---

## 4. Skills — Reusable Prompt Templates

**What it is:** A directory with a `SKILL.md` file that Claude loads when the task matches its description. More powerful than commands — supports sub-agent execution, fine-grained permissions, and auto-suggestion.

**Structure:**
```
.claude/skills/
  skill-name/
    SKILL.md          # required — frontmatter + instructions
    supporting-file.md  # optional
```

**Frontmatter fields:**

| Field | Description |
|-------|-------------|
| `name` | Display name (lowercase, hyphens) |
| `description` | When Claude should use this skill — critical for auto-suggestion |
| `when_to_use` | Additional context appended to description |
| `allowed-tools` | Space-separated tools the skill can use without prompts |
| `argument-hint` | Hint shown in autocomplete (e.g. `<feature-name>`) |
| `user-invocable` | Whether it appears in `/` menu (default: true) |
| `disable-model-invocation` | Prevent Claude from auto-loading (user-only) |
| `context` | `fork` to run in isolated sub-agent context |
| `agent` | Sub-agent type when `context: fork` |
| `model` | Override model for this skill |
| `effort` | Override effort: `low`, `medium`, `high`, `max` |
| `paths` | Glob patterns limiting when skill activates |

**Dynamic substitutions in skill content:**
- `$ARGUMENTS` — all arguments passed to the skill
- `$N` — specific argument by index (e.g. `$1`, `$2`)
- `` !`command` `` — inline shell command (output replaces placeholder)

**Commands vs Skills:**
- `.claude/commands/*.md` — simple markdown, no frontmatter requirements, still works
- `.claude/skills/*/SKILL.md` — full features, auto-suggestion, sub-agent support
- If same name exists in both, **skill takes precedence**
- Modern best practice: use skills

**Official docs:** https://docs.anthropic.com/en/docs/claude-code/skills

---

## 5. MCP — Model Context Protocol

**What it is:** A standard protocol for connecting Claude to external tools and services. Configured in `.mcp.json` (project-scoped).

**Configuration file:** `.mcp.json` (NOT `settings.json` — common mistake)

**Scope hierarchy:**
1. Project `.mcp.json` (committed, shared with team — highest priority)
2. Local `~/.claude/settings.local.json` (per-developer, gitignored)
3. User `~/.claude.json` (global user config)

**Format:**
```json
{
  "mcpServers": {
    "server-name": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": {
        "API_KEY": "${MY_SECRET_KEY}"
      }
    }
  }
}
```

**Environment variable syntax in `.mcp.json`:**
- `${VAR}` — expands to environment variable
- `${VAR:-default}` — expands to VAR if set, otherwise "default"

**Register via CLI:**
```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest
```

**Useful MCP servers for this stack:**

| Server | Package | Use case |
|--------|---------|----------|
| Context7 | `@upstash/context7-mcp` | Skills registry, documentation lookup |
| GitHub | `@modelcontextprotocol/server-github` | PR management, issue tracking |
| Playwright | `@playwright/mcp` | Browser automation, visual testing |
| Filesystem | `@modelcontextprotocol/server-filesystem` | Enhanced file operations |

**Official docs:** https://docs.anthropic.com/en/docs/claude-code/mcp

---

## 6. Memory System — 4 Layers

**What it is:** How Claude remembers information across sessions.

| Layer | What it is | How to use |
|-------|-----------|-----------|
| **CLAUDE.md** | Static rules you write manually | Add permanent project rules here |
| **Auto Memory** | Notes Claude saves during sessions | Claude learns your preferences automatically |
| **Auto Dream** | Consolidation cycle (every 24h) | Automatic — cleans and compresses auto memory |
| **Scoped Memory** | Project / personal / org levels | Different contexts have different memory scopes |

**View or edit memory:** `/memory`

**Best practice:** Put critical rules in `CLAUDE.md`. Let Claude learn preferences via auto memory. Don't stuff CLAUDE.md with everything — it degrades performance.

**Official docs:** https://docs.anthropic.com/en/docs/claude-code/memory

---

## 7. Sub-Agents & Parallel Execution

**What it is:** Claude Code can spawn sub-agents to work on independent tasks in parallel.

**When to use parallel execution:**
- 3+ independent tasks with no shared state
- Tasks that touch different files/features
- Parallel verification: lint + test + build simultaneously

**When NOT to parallelize:**
- Tasks with shared state
- Overlapping files
- Sequential dependencies (task B requires task A's output)

**Sub-agent types available:**
- `Explore` — read-only, fast codebase exploration
- `Plan` — architecture design, no file writes
- `general-purpose` — full capabilities

**Example pattern in CLAUDE.md:**
```
For tasks with no shared state (independent features, parallel verification),
use sub-agents via the Agent tool. Dispatch lint + test + build in parallel.
```

**Official docs:** https://docs.anthropic.com/en/docs/claude-code/sub-agents

---

## 8. Built-in Commands Cheat Sheet

These are always available in any Claude Code session:

| Command | What it does | When to use |
|---------|-------------|-------------|
| `/compact` | Summarize conversation, free context | Use often — every 20-30 exchanges |
| `/rewind` | Roll back conversation + code changes | When you want to undo a direction |
| `/branch` | Explore alternative without losing state | When you want to try a different approach |
| `/model haiku` | Switch to Claude Haiku (fast + cheap) | Simple tasks: rename, formatting, lookup |
| `/model sonnet` | Switch back to Sonnet | Default model |
| `/model opus` | Switch to Opus (most capable) | Hardest problems, complex architecture |
| `/effort low` | Minimal reasoning | Simple, obvious tasks |
| `/effort medium` | Standard reasoning | Default |
| `/effort high` | Extended reasoning | Complex bugs, architecture decisions |
| `/effort max` | Max reasoning (Opus only) | Hardest problems |
| `/memory` | View/edit Claude's memory | Review or correct learned preferences |
| `/install-github-app` | Connect Claude to GitHub | PR reviews, issue tracking |
| `/mcp` | Manage MCP connections | Add/remove/list MCP servers |
| `/clear` | Wipe conversation, start fresh | When context is corrupted |
| `/loop 5m /lint` | Run command on interval | Recurring checks during long sessions |

---

## 9. React 19 Patterns for Claude

Claude defaults to React 18 patterns unless explicitly told otherwise. This template uses React 19.

**Key changes to enforce:**

| Old (React 18) | New (React 19) | Why |
|----------------|----------------|-----|
| `forwardRef(fn)` | Pass `ref` as prop directly | `ref` is now a regular prop |
| `useEffect + useState` for async | `use(promise)` | Cleaner async data in render |
| No built-in optimistic UI | `useOptimistic()` | Built-in optimistic updates |
| Sync state updates | `useTransition()` for non-urgent | Deferred rendering |

**Example — ref as prop (React 19):**
```tsx
// React 19 — ref is just a prop
function Input({ ref, ...props }: React.ComponentProps<'input'>) {
  return <input ref={ref} {...props} />
}
```

**Example — use() hook:**
```tsx
// React 19 — use() for async resources
function UserName({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise) // Suspense boundary handles loading
  return <span>{user.name}</span>
}
```

---

## 10. Context7 Skills Registry

**What it is:** A registry of third-party skills for Claude Code, Cursor, and other AI tools. This template uses it for design-focused skills.

**Install via CLI:**
```bash
npx ctx7 skills install /agentskills-community/agentskills \
  frontend-design frontend-ui-ux web-design-guidelines ui-design-system ux-researcher-designer
```

**Or interactively:** `/setup-skills`

**Useful skills for this stack:**

| Skill | What it does |
|-------|-------------|
| `frontend-design` | Production-grade UI with strong aesthetic direction |
| `frontend-ui-ux` | Designer-turn-developer UI/UX approach |
| `web-design-guidelines` | Accessibility, spacing, typography reviews |
| `ui-design-system` | Design tokens, component documentation |
| `ux-researcher-designer` | Personas, journey maps, usability frameworks |

**Registry:** https://context7.com/skills
**Agent Skills standard:** https://agentskills.io

---

## 11. External Resources

**Official Claude Code docs:**
- Overview: https://docs.anthropic.com/en/docs/claude-code/overview
- Best practices: https://docs.anthropic.com/en/docs/claude-code/best-practices
- Settings reference: https://docs.anthropic.com/en/docs/claude-code/settings
- Hooks reference: https://docs.anthropic.com/en/docs/claude-code/hooks
- Skills reference: https://docs.anthropic.com/en/docs/claude-code/skills
- MCP guide: https://docs.anthropic.com/en/docs/claude-code/mcp
- Memory system: https://docs.anthropic.com/en/docs/claude-code/memory
- Permissions: https://docs.anthropic.com/en/docs/claude-code/permissions
- Sub-agents: https://docs.anthropic.com/en/docs/claude-code/sub-agents

**Community resources:**
- Awesome Claude Code (curated skills, hooks, commands): https://github.com/hesreallyhim/awesome-claude-code
- Claude Code Ultimate Guide: https://github.com/FlorianBruniaux/claude-code-ultimate-guide
- Claude How-To (visual, example-driven): https://github.com/luongnv89/claude-howto
- ClaudeLog (tutorials, best practices): https://claudelog.com

**Writing a good CLAUDE.md:**
- https://www.humanlayer.dev/blog/writing-a-good-claude-md
