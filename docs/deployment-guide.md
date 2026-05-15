# Deployment Guide

## Architecture

```
GitHub (main branch)
    ↓ push
GitHub Actions
    ↓ npm ci + npm run build
Cloudflare Pages (kusumeshkant-portfolio project)
    ↓ CDN distribution
kusumeshkant.dqstore.in  ←  CNAME → kusumeshkant-portfolio.pages.dev
```

## One-Time Setup

### 1. Create the Cloudflare Pages project

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Workers & Pages → Create application → Pages → Connect to Git
3. Select the `portfolio` GitHub repository
4. Configure build settings:
   - **Production branch:** `main`
   - **Preview branch:** `develop`
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `20`
5. Click **Save and Deploy** (first deploy will run)

### 2. Add GitHub Secrets

In the GitHub repo: Settings → Secrets and variables → Actions → New repository secret

| Secret | Where to find it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | dash.cloudflare.com → Profile → API Tokens → Create Token → use "Cloudflare Pages: Edit" template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → right sidebar under "Account ID" |

### 3. Attach the custom domain

1. Cloudflare Pages → `kusumeshkant-portfolio` → Custom domains
2. Click **Set up a custom domain**
3. Enter: `kusumeshkant.dqstore.in`
4. Cloudflare auto-creates the DNS record (CNAME) since dqstore.in is already on Cloudflare
5. Wait ~5 minutes for SSL to provision

DNS record that gets created:
```
Type:    CNAME
Name:    kusumeshkant
Target:  kusumeshkant-portfolio.pages.dev
Proxy:   Proxied (orange cloud)
```

### 4. Verify environments

| Branch | URL |
|---|---|
| `main` | kusumeshkant.dqstore.in |
| `develop` | `<hash>-kusumeshkant-portfolio.pages.dev` |

The preview URL for `develop` appears in the GitHub Actions output after each deploy.

## Ongoing Deployments

Every push to `main` automatically:
1. Triggers GitHub Actions (`deploy.yml`)
2. Runs `npm ci` (reproducible install from lock file)
3. Runs `npm run build`
4. Uploads `dist/` to Cloudflare Pages
5. Cloudflare CDN distributes globally

Zero manual steps after initial setup.

## Rollback in Cloudflare

If a bad deploy reaches production:

1. Cloudflare Pages → `kusumeshkant-portfolio` → Deployments
2. Find the last good deployment
3. Click the three-dot menu → **Rollback to this deployment**

Instant — no rebuild needed, Cloudflare just activates the previous deployment.

## Monitoring

- **Deployment status:** GitHub Actions tab in the repository
- **Error logs:** Cloudflare Pages → Deployments → click a deployment → View logs
- **Analytics:** Cloudflare Pages → Analytics (page views, regions, etc.)
