# Deployment guide

A Vite build produces static client files, not a backend. Browser code, configuration and shipped data are visible to users. Never place secrets in client code or `VITE_` variables. Authentication UI alone does not protect data: authorization must be enforced by a trusted backend. Follow customer requirements for identity, approved services, data residency and operations.

## Before deployment

- Confirm the intended audience, data classification, hosting, domain and owner.
- Run `npm ci`, `npm run lint`, `npm test -- --run` and `npm run build` on Node 24; resolve failures.
- Test keyboard navigation, mobile layouts, error states and direct links, including refreshing a nested route.
- Use least-privilege secrets and workflow permissions. Consider GitHub Actions workflow dependency lockfiles or verified full commit SHA pins. Plan monitoring, rollback, updates and incident ownership.
- Review deployment destination and get the appropriate project approval before publishing. GitHub Pages sites are publicly accessible even if the repository is private.

## GitHub Pages

Suitable for public static demos and documentation. Set Vite `base` to `/REPOSITORY/` for a project site or `/` for a custom domain or root user site. Configure Pages to use GitHub Actions following [Vite's current deployment guide](https://vite.dev/guide/static-deploy) and [GitHub's Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). Use Node 24 and `npm ci`. Test assets and direct nested URLs after deployment; client-side browser routing may need a host-specific fallback or hash routing.

## Vercel

Import the repository, select Vite, and verify build command `npm run build` and output `dist`. Review preview and production visibility, environment settings, custom domain and any SPA rewrites against the provider's current documentation. Preview URLs are not a substitute for access control.

## VPS / Linode

Serve `dist/` with a maintained web server and TLS. Provision a non-root account limited to a dedicated deployment directory, use a dedicated credential and independently verify and pin the server host key. Never rely on unverified `ssh-keyscan` during the deployment itself. Prepare a staged release and tested rollback; validate the destination carefully before any `rsync --delete`. Configure SPA fallback, caching, HTTPS renewal and monitoring. Review the host, path and credentials with the operator before deploying; test first on a disposable environment.

## References

- [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use)
- [Vite environment variables](https://vite.dev/guide/env-and-mode)
- [Vite static deployment](https://vite.dev/guide/static-deploy)
