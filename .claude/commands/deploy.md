---
description: Plan and verify a deployment for the selected hosting target.
disable-model-invocation: true
---

Read `docs/deploy.md` and inspect the existing project before proposing deployment. Ask for missing target, visibility, domain and data-classification information. Explain that a Vite SPA is public client code and cannot enforce server-side authorization. Do not publish customer or sensitive data without an approved architecture and destination.

Prepare code or configuration as a reviewable diff. For GitHub Pages verify repository base path and deep links; Pages sites are public. For VPS hosting use a dedicated restricted deploy identity, independently verified host key, a bounded target directory, and a tested rollback. Never introduce a root deployment key, blindly trust `ssh-keyscan`, or use destructive synchronization without explicitly reviewing its destination. Recommend Vercel or another static host when appropriate.

Run relevant checks and present the exact deployment action, destination and outstanding validation. Do not push, publish, alter DNS, provision infrastructure or deploy without the user's explicit instruction for that action.
