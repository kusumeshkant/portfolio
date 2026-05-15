# Kusumeshkant Sharma — Portfolio

Personal portfolio of **Kusumeshkant Sharma**, Full Stack Engineer & Flutter Developer.

**Production:** [kusumeshkant.dqstore.in](https://kusumeshkant.dqstore.in)  
**GitHub:** [github.com/kusumeshkant/portfolio](https://github.com/kusumeshkant/portfolio)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 (SWC) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion 11 |
| 3D | Three.js + React Three Fiber + Drei |
| Forms | react-hook-form |
| SEO | react-helmet-async |
| Deployment | Cloudflare Pages |
| CI/CD | GitHub Actions |

---

## Quick Start

```bash
npm install
npm run dev       # → localhost:5173
npm run build     # → dist/
npm run preview   # preview the production build
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, About, Skills, Experience, Projects, Contact
│   ├── three/        # HeroScene, TechGlobe, FloatingShapes (WebGL)
│   └── ui/           # Button, GlassCard, SectionHeader, Cursor
├── data/             # skills.js, projects.js, experience.js, navigation.js
├── hooks/            # useCountUp, useMousePosition, useScrollProgress
├── utils/            # cn() class utility
├── App.jsx           # Root — section composition, lazy loading, orbs
├── main.jsx          # React 18 createRoot
└── index.css         # Global styles, Tailwind layers, dot-grid background
```

---

## Branch Strategy

```
main       → Production  → kusumeshkant.dqstore.in
develop    → Preview     → <hash>.kusumeshkant-portfolio.pages.dev
feature/*  → Local dev   → build validated on PR, no deploy
```

**Never push unstable code to `main` directly.**  
See [docs/git-workflow.md](docs/git-workflow.md) for the full workflow.

---

## Deployment

Every push to `main` → GitHub Actions → Cloudflare Pages → production.  
Every push to `develop` → GitHub Actions → Cloudflare Pages → preview URL.

Required GitHub secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

See [docs/deployment-guide.md](docs/deployment-guide.md) for complete setup.

---

## Content Updates

| What to change | File |
|---|---|
| Name, email, social links | `src/data/navigation.js` |
| Skills & proficiency | `src/data/skills.js` |
| Work experience | `src/data/experience.js` |
| Projects & links | `src/data/projects.js` |
| SEO meta tags | `index.html` |
| Photo | `public/me.jpeg` |
| Resume | `public/Kusumeshkant_Sharma_Resume.pdf` |

---

## SEO Checklist

- [x] `<title>` and `<meta description>`
- [x] Open Graph tags (LinkedIn, WhatsApp previews)
- [x] Twitter Card
- [x] Canonical URL
- [x] JSON-LD Person schema
- [x] `robots.txt` pointing to sitemap
- [x] `sitemap.xml`
- [x] Font preconnect
- [ ] Add real OG image at `public/og-image.png` (1200×630px)
- [ ] Verify in Google Search Console after deploy

---

© 2026 Kusumeshkant Sharma · All rights reserved
