# Template maintenance and verification

## Dependency policy

Use Node 24 LTS and `npm ci` with the committed lockfile. Review `npm audit` results, affected dependency paths and reachability. Avoid `npm audit fix --force` without a separate compatibility review. Update direct dependency floors deliberately and run lint, tests, coverage, build and a development-server smoke check. Automated checks do not guarantee production readiness.

The template remains on TypeScript 6 while TypeScript ESLint supports `>=4.8.4 <6.1.0`; the maintainers have reported TypeScript 7 API incompatibility. Recheck the [supported dependency versions](https://typescript-eslint.io/users/dependency-versions/) and [TypeScript 7 tracking issue](https://github.com/typescript-eslint/typescript-eslint/issues/12518) before a migration. Avoid forcing a major upgrade merely to make version numbers match.

## Claude Code design decisions

- The template uses `/review-changes`, leaving the built-in `/review` alias available. Visual-direction generation requires explicit invocation; read-only review may be invoked when relevant.
- Skills use the documented `$ARGUMENTS` mechanism. Named arguments, hooks, shell injection and forked execution are optional: add them for a concrete need, not just because they exist. See [skills](https://code.claude.com/docs/en/skills).
- Optional memory, imports, scheduling, plugins, agent teams, LSP and hook diagnostics are product capabilities, not mandatory template dependencies. Read the [current Claude Code reference](https://code.claude.com/docs/en/) and enable only what suits the project. Imported instructions consume context; use them intentionally.
- ESLint's ECMAScript scope-analysis setting and TypeScript's output target serve different purposes. Both now use 2022 to avoid confusing defaults; this does not guarantee browser compatibility.
- The version history in the starter and changelog records past behavior. Use the current README and guides for current instructions. Treat the wiki as supplementary until its content has been reviewed.

## Manual acceptance checks

These checks require an installed, authenticated Claude Code environment or an authorized GitHub account. Do not claim them complete based only on static inspection or CI.

1. In a fresh, disposable project created with the README command, run `/setup` with a small fake-data project; confirm outline, plan and decisions reflect the answers and existing work is not overwritten.
2. Run `/setup-skills`; confirm third-party installation is optional and no integration is silently enabled.
3. With no GitHub token, confirm the optional MCP server does not block local work. With a suitably scoped test token and explicit approval, check `/mcp`, perform a read and confirm write tools are unavailable. Never paste credentials into files or logs.
4. In a disposable derived project with custom instructions, run `/sync-template`; confirm the diff is shown and local changes remain intact unless individually approved.
5. Confirm `/review-changes`, `/review`, both reviewers and `/generate-visual-direction` appear as expected in the installed Claude Code version. Use synthetic references only.
6. Review the Learning and Skills wiki pages against the current README and official docs; correct or clearly mark historical material. This repository's tracked documentation is the current template reference.

Record Claude Code version, operating system, date and observed results for each check. Follow client policies when using customer data, hosted models or external services.
