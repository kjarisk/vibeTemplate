---
description: Review optional skill sources and set up documentation lookup for Claude Code.
disable-model-invocation: true
---

List the project skills in `.claude/skills/` and explain what they do. External skills are optional and can contain instructions or execute tools; inspect the source, license, permissions and data handling before installing. Do not install automatically.

For current library documentation, offer the official Context7 setup for Claude Code:

```bash
npx ctx7 setup --claude --project
```

The interactive setup offers CLI + skills or MCP and may require authentication. Review what it changes, use only if permitted by project policy, then verify with Claude's `/skills` or `/mcp`. Claude-specific project skills are under `.claude/skills/`; `.agents/skills/` is a universal location used by other tools and is not assumed to be auto-discovered by Claude Code. Avoid exposing secrets or client data to third-party services without approval.

For other skills, use the current provider's instructions, review the actual skill before trusting it, and explain whether it is project-shared or user-local. Report any setup that could not be verified.
