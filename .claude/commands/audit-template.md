---
description: Audit the project using evidence, risks and explicit verification limits.
---

Inspect the current project and adapt the audit to its actual stage; a fresh template is not a failed configured project. Review scope, docs, instructions, skills, agents, permissions, hooks, MCP, dependency/runtime support, code, tests, accessibility, deployment and data/privacy boundaries. Check for conflicting guidance and assumed capabilities.

Run `npm ci` only when appropriate and authorized, then `npm run lint`, `npm test -- --run`, and `npm run build`; run dependency security checks where network and policy permit. Do not perform installs, audits or destructive checks that change the project without explaining the effect. Check current primary documentation for version-sensitive claims; never infer a vulnerability scan or working deployment from static code.

Report findings ordered by severity with file paths, evidence, impact, recommended action and verification status. Separate confirmed facts from hypotheses, and state checks not run. Avoid invented scores or token counts. Suggest a small prioritized roadmap and offer focused patches.
