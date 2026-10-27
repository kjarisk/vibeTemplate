---
description: Compare upstream harness changes and apply only reviewed, project-safe updates.
disable-model-invocation: true
---

Identify the source template version and inspect the current working tree. Never overwrite project instructions, settings, rules, docs, or application code wholesale. Fetch upstream into a temporary location, compare each proposed change against the project's base and local modifications, and present a concise per-file diff. Preserve project-specific security settings, model choice, integrations and customizations.

Ask which changes to apply. Use a three-way merge where the base is available; otherwise apply reviewed hunks manually. Stop on conflicts and show them to the user. Do not silently stage or commit unrelated files. Run relevant checks, show remaining differences, and report any unverified behavior.
