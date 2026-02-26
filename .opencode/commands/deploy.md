---
description: Set up and deploy this app to a Linode subdomain via rsync over SSH
---

Walk the user through the full deployment setup for this project onto a Linode (or any Linux VPS) subdomain. Follow these steps in order, pausing between each group to let the user complete their part.

---

## Step 1 — Gather info (ask the user)

Ask for:

1. The subdomain they want to use (e.g. `myapp.yourdomain.com`)
2. Their server IP address
3. Their SSH username on the server (usually `root`)
4. Their DNS provider (e.g. Squarespace, Cloudflare, Namecheap)

---

## Step 2 — DNS (user does this)

Tell the user to add an **A record** in their DNS provider:

- **Host / Name:** the subdomain prefix only (e.g. `myapp` — not the full domain)
- **Type:** A
- **Value / Points to:** their server IP address
- **TTL:** leave as default (or 3600)

For **Squarespace** specifically:

1. Go to squarespace.com → account → Domains
2. Click the domain → DNS Settings
3. Scroll to "Custom Records" → Add Record
4. Type = A, Host = subdomain prefix, Value = server IP
5. Save

Tell them DNS propagation can take 15–60 minutes (rarely up to 24h). They can verify with:

```bash
dig YOUR_SUBDOMAIN +short
```

It should return their server IP when ready.

---

## Step 3 — Server setup (user does this over SSH)

Tell the user to SSH into their server and run these commands one at a time:

```bash
# 1. Create the web root directory
mkdir -p /var/www/YOUR_SUBDOMAIN

# 2. Create the Nginx config
nano /etc/nginx/sites-available/YOUR_SUBDOMAIN
```

Paste this Nginx config (replace `YOUR_SUBDOMAIN` with the full subdomain):

```nginx
server {
    listen 80;
    server_name YOUR_SUBDOMAIN;
    root /var/www/YOUR_SUBDOMAIN;
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

Then enable it and reload Nginx:

```bash
ln -s /etc/nginx/sites-available/YOUR_SUBDOMAIN /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## Step 4 — SSH deploy key (user does this on the server)

Tell the user to generate a dedicated deploy key on the server:

```bash
ssh-keygen -t ed25519 -C "github-action-deploy" -f /root/.ssh/deploy_key -N ""
cat /root/.ssh/deploy_key.pub >> /root/.ssh/authorized_keys
cat /root/.ssh/deploy_key
```

Copy the entire output of `cat /root/.ssh/deploy_key` (the private key, starting with `-----BEGIN OPENSSH PRIVATE KEY-----`).

---

## Step 5 — GitHub secrets (user does this)

Tell the user to go to their GitHub repo → Settings → Secrets and variables → Actions → New repository secret, and add these three secrets:

| Secret name   | Value                                            |
| ------------- | ------------------------------------------------ |
| `DEPLOY_KEY`  | The private key from Step 4 (full content)       |
| `LINODE_HOST` | The full subdomain (e.g. `myapp.yourdomain.com`) |
| `LINODE_USER` | Their SSH username (e.g. `root`)                 |

---

## Step 6 — Code changes (you do this)

Make these two changes:

### 6a. `vite.config.ts`

Change `base` to `/` (subdomain = root, no subfolder path needed):

```ts
base: '/',
```

### 6b. `.github/workflows/deploy.yml`

Replace the entire file with this rsync-over-SSH deploy workflow:

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

After making these changes, commit and push to `main`. The GitHub Action will build and deploy automatically.

---

## Step 7 — SSL with Certbot (user does this — after DNS propagates)

Once `dig YOUR_SUBDOMAIN +short` returns the correct IP, run on the server:

```bash
certbot --nginx -d YOUR_SUBDOMAIN
```

Certbot will automatically update the Nginx config with SSL and set up auto-renewal.

---

## Step 8 — Verify

Tell the user to visit `https://YOUR_SUBDOMAIN` in a browser. The app should load.

If it doesn't:

- Check the GitHub Actions tab to confirm the workflow ran successfully
- Run `systemctl status nginx` on the server
- Run `ls /var/www/YOUR_SUBDOMAIN/` to confirm files were deployed
- Check `nginx -t` for config errors

---

## Notes

- The web root is always `/var/www/FULL_SUBDOMAIN/` (e.g. `/var/www/myapp.yourdomain.com/`)
- PM2 is NOT needed — this is a static app served by Nginx, not a Node.js process
- The `deploy_key` is only for GitHub Actions. It lives at `/root/.ssh/deploy_key` on the server.
- If the server already hosts other apps, the new Nginx server block coexists fine — each subdomain gets its own `server_name` block
- See `docs/deploy.md` for the full human-readable reference
