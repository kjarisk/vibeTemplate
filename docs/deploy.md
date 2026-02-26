# Deploy Guide — Linode Subdomain via rsync over SSH

This is the reference guide for deploying any app from this template to a Linux VPS (Linode or similar) as a subdomain.

For the AI-assisted version of this guide, run `/deploy` in OpenCode.

---

## Overview

The deployment model is:

1. GitHub Actions builds the app (`npm run build`)
2. rsync copies `dist/` to the server over SSH
3. Nginx serves the static files
4. Certbot handles SSL

No Node.js process, no PM2, no Docker — just static files behind Nginx.

---

## One-time setup

### 1. DNS — add an A record

In your DNS provider (Squarespace, Cloudflare, Namecheap, etc.):

| Field             | Value                                                            |
| ----------------- | ---------------------------------------------------------------- |
| Type              | A                                                                |
| Host / Name       | subdomain prefix only (e.g. `myapp`, not `myapp.yourdomain.com`) |
| Value / Points to | your server IP address                                           |
| TTL               | default (or 3600)                                                |

**Squarespace steps:**

1. squarespace.com → account → Domains
2. Click your domain → DNS Settings
3. Scroll to Custom Records → Add Record
4. Fill in the fields above → Save

Verify propagation (can take 15–60 min):

```bash
dig myapp.yourdomain.com +short
# should return your server IP
```

---

### 2. Server — Nginx config

SSH into your server and run:

```bash
mkdir -p /var/www/myapp.yourdomain.com

nano /etc/nginx/sites-available/myapp.yourdomain.com
```

Paste (replace the subdomain):

```nginx
server {
    listen 80;
    server_name myapp.yourdomain.com;
    root /var/www/myapp.yourdomain.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable and reload:

```bash
ln -s /etc/nginx/sites-available/myapp.yourdomain.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

### 3. Server — SSH deploy key

Generate a dedicated key for GitHub Actions (do this on the server):

```bash
ssh-keygen -t ed25519 -C "github-action-deploy" -f /root/.ssh/deploy_key -N ""
cat /root/.ssh/deploy_key.pub >> /root/.ssh/authorized_keys
cat /root/.ssh/deploy_key
```

Copy the entire output of the last command — this is the private key you'll paste into GitHub.

---

### 4. GitHub — repository secrets

Go to your repo → Settings → Secrets and variables → Actions → New repository secret.

Add these three:

| Secret name   | Value                                                                    |
| ------------- | ------------------------------------------------------------------------ |
| `DEPLOY_KEY`  | The private key from step 3 (full content including header/footer lines) |
| `LINODE_HOST` | Full subdomain: `myapp.yourdomain.com`                                   |
| `LINODE_USER` | Your SSH username (e.g. `root`)                                          |

---

### 5. Code — two file changes

**`vite.config.ts`** — set base to `/`:

```ts
base: '/',
```

(When deploying to a subdomain you're at the root, not a subfolder path like `/myapp/`.)

**`.github/workflows/deploy.yml`** — replace with:

```yaml
name: Deploy to Linode

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - name: Deploy via rsync
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
          LINODE_HOST: ${{ secrets.LINODE_HOST }}
          LINODE_USER: ${{ secrets.LINODE_USER }}
        run: |
          mkdir -p ~/.ssh
          echo "$DEPLOY_KEY" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H "$LINODE_HOST" >> ~/.ssh/known_hosts
          rsync -avz --delete \
            -e "ssh -i ~/.ssh/deploy_key" \
            dist/ \
            "$LINODE_USER@$LINODE_HOST:/var/www/$LINODE_HOST/"
```

Commit and push to `main`. The Action will run automatically.

---

### 6. SSL — Certbot (after DNS propagates)

Once `dig myapp.yourdomain.com +short` returns your server IP:

```bash
certbot --nginx -d myapp.yourdomain.com
```

Certbot updates your Nginx config automatically and sets up auto-renewal.

---

## Subsequent deploys

Just push to `main`. The GitHub Action handles everything:

- Builds the app
- rsyncs `dist/` to `/var/www/myapp.yourdomain.com/`
- The live site updates within ~1 minute

You can also trigger manually from the Actions tab → "Run workflow".

---

## Troubleshooting

**`DNS_PROBE_FINISHED_NXDOMAIN` in browser**
DNS hasn't propagated yet. Run `dig myapp.yourdomain.com +short` — if it returns nothing, wait and retry.

**GitHub Action fails at rsync step**

- Check that all three secrets (`DEPLOY_KEY`, `LINODE_HOST`, `LINODE_USER`) are set correctly
- Confirm the public key was added to `~/.ssh/authorized_keys` on the server
- Confirm `/var/www/myapp.yourdomain.com/` exists on the server

**Nginx returns 404 after deploy**

- Run `ls /var/www/myapp.yourdomain.com/` — if empty, rsync didn't run yet
- Run `nginx -t` to check for config errors
- Run `systemctl status nginx` to confirm it's running

**SSL cert fails**

- DNS must resolve first — Certbot can't issue a cert until the domain points to the server
- Run `dig myapp.yourdomain.com +short` and confirm it returns your IP before running Certbot

**Server already hosts other apps**
No conflict. Each subdomain gets its own `server_name` block in Nginx. They coexist fine.
PM2 is not involved — this app is static, not a Node.js process.

---

## Notes

- Web root is always `/var/www/FULL_SUBDOMAIN/` — e.g. `/var/www/myapp.yourdomain.com/`
- The deploy key lives at `/root/.ssh/deploy_key` on the server — separate from your personal SSH key
- `vite.config.ts` must have `base: '/'` for subdomain deploys (not `/appname/`)
- For the AI-guided version of this entire setup, run `/deploy` in OpenCode
