# Cloudflare Setup

## DNS Architecture

Domain registrar: dqstore.in (on Cloudflare DNS)

```
dqstore.in
├── kusumeshkant.dqstore.in  → CNAME → kusumeshkant-portfolio.pages.dev  (portfolio)
├── api.dqstore.in           → (future: backend API)
├── admin.dqstore.in         → (future: admin panel)
└── blog.dqstore.in          → (future: blog)
```

## Cloudflare Pages Project

**Project name:** `kusumeshkant-portfolio`

| Setting | Value |
|---|---|
| Production branch | `main` |
| Preview branch | `develop` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js version | `20` |

## Security Headers

Already configured in `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Cloudflare Pages serves these headers automatically.

## SPA Routing

`public/_redirects` handles client-side routing:

```
/* /index.html 200
```

This ensures deep-links like `kusumeshkant.dqstore.in/#projects` work correctly.

## SSL

SSL is provisioned automatically by Cloudflare when the custom domain is added to the Pages project. It uses Cloudflare's Universal SSL certificate — zero configuration needed.

## Cloudflare Caching

Cloudflare automatically caches the static assets served by Pages. The `Cache-Control: immutable` header on `/assets/*` ensures hashed JS/CSS files are cached at the edge for 1 year.

## Creating the API Token

For GitHub Actions deployment:

1. dash.cloudflare.com → Profile icon → My Profile → API Tokens
2. Create Token → Use template: **Cloudflare Pages: Edit**
3. Permissions: `Account - Cloudflare Pages - Edit`
4. Account Resources: Include → your account
5. Create Token → copy the token
6. Add to GitHub: repo → Settings → Secrets → `CLOUDFLARE_API_TOKEN`
