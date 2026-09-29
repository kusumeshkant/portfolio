# Portfolio Site Review — kusumeshkant.dqstore.in

**Status as of 2026-09-29, branch `site-review-fixes` (not pushed or deployed).**
Source of truth: the current resume, `public/Kusumesh_Resume.pdf` (byte-identical to `D:\Documents\Resumes\Kusumesh_Resume.pdf`).

Legend: ✅ done (commit) · ⏸ deferred · ❌ not done (reason)

---

## Decisions applied

| Topic | Decision | Commit |
|---|---|---|
| Headline | "Senior Flutter Developer · Cross-Platform iOS & Android" (matches resume header); no AI title — AI work appears only as personal-project cards and one About line | Flutter-positioning commit |
| Years | 5+ everywhere | `87089ae` |
| Hero stats | 5+ Years · 900+ Bank branches · 3 Domains (Fintech · Health · E-commerce) | `87089ae`, `c7c3618` |
| Apto | Sr. Software Developer (Flutter), Sept 2025 — Mar 2026 | `cfb7f12` |
| RacketPro | Flutter + GetX (site); resume still says React + Redux | `1ae576b` |
| Cockpit / DQ Orchestrator | Added from resume; Cockpit featured first, "In development"; no links | `1ae576b` |
| LinkedIn | `/in/kusumeshkantsharma/` (the `-sharma` URL redirects there) | `683facf`, `6a4ebf3` |
| Fiverr | Removed everywhere | `2a90cb9`, `bb95031`, `e86fd3f`, `6a4ebf3` |
| EE | Kept My EE Play Store link; neutral "UK e-commerce app — checkout module" | `1ae576b` |
| Srajan AI | `com.srajanai.cloud`; "Flutter front end built from scratch" | `87089ae` |
| Selfe Loans | Standalone app delisted from both stores (404) → links to Equitas' official Selfe Loans product page | `1ae576b` |

---

## 1. Must fix

| # | Item | Status |
|---|---|---|
| M1 | Browser title swapped to "D.Q." after load | ✅ `683facf` — Helmet removed; title is "Kusumeshkant Sharma — Senior Flutter Developer" |
| M2 | "Full Stack Engineer" positioning (meta, OG, JSON-LD, hero, photo cards, footer) | ✅ `6a4ebf3`, `23a14c6`, `bb95031`, `e86fd3f`, `3959b3d` |
| M3 | Years of experience | ✅ `87089ae` — single `SITE_IDENTITY.yearsExperience` (5) |
| M4 | Company names missing on Experience cards | ✅ `cfb7f12` |
| M5 | Experience/About copy vs resume | ✅ `cfb7f12`, `bb95031` |
| M6 | Broken/dead project links, "Code" buttons, EE/RacketPro/Srajan copy | ✅ `1ae576b`, `87089ae` — every link verified 200 |
| M7 | Cockpit + DQ AI Agent Orchestrator missing | ✅ `1ae576b` |
| M8 | Skill % bars, Azure | ✅ `bc7e664` — grouped tags, order Mobile → State & Architecture → AI & Agents → Backend → Cloud → Frontend |
| M9 | Unbacked claims (Sub-100ms/60fps/Lighthouse 90+, microservices, IoT) | ✅ `619282e`, `cfb7f12` |
| M10 | Resume button pointed at old PDF | ✅ `ec9e028` — April PDF deleted |
| M11 | Hero clipped at 360/768px | ✅ `23a14c6`, `c7c3618` — verified at 360/768/1024/1440 |
| M12 | Button focus ring removed | ✅ `683facf` (+ input focus rings `e86fd3f`) |
| M13 | og-image.png missing | ✅ `6a4ebf3`, regenerated `3959b3d` — 1200×630 with width/height/alt tags |
| M14 | Contact form claimed "sent" via mailto | ✅ Form removed by choice — direct contact details only (§4) |

## 2. Should fix

| # | Item | Status |
|---|---|---|
| S1 | Fiverr prominence | ✅ removed entirely |
| S2 | Hero clutter (floating badges, repeated availability, fake "Online") | ✅ `23a14c6`, `bb95031` |
| S3 | Custom cursor / `cursor: none` | ✅ `683facf` — deleted |
| S4 | "Move your mouse" / "INTERACTIVE · MOVE MOUSE" | ✅ `1ae576b`, `619282e` |
| S5 | No `prefers-reduced-motion` | ✅ `683facf` — `MotionConfig reducedMotion="user"`, CSS overrides, 3D scenes skipped |
| S6 | Performance (mobile 39) | ✅ `23a14c6`, `99d0f42`, `3ab6b91` — see §3 |
| S7 | `ink.faint` contrast, tiny text | ✅ `683facf` — #6E7681 (≈4.3:1), nothing below 11px |
| S8 | Empty page without JS; counters start at 0 | ✅ `bb95031`, `3ab6b91` — static numbers; full page prerendered at build time |
| S9 | Two `<h1>`s | ✅ `23a14c6` |
| S10 | Contact duplicates | ✅ `e86fd3f` |
| S11 | Footer mailto/tel open blank tabs | ✅ `e86fd3f` |
| S12 | SVG favicon couldn't load photo | ✅ `6a4ebf3` — favicon.ico, icon-192, apple-touch-icon |
| S13 | Lint broken | ✅ `e781e65` — ESLint 9 flat config, 0 warnings |

Also: unused deps removed (`gsap`, `postprocessing`, `@react-three/postprocessing`, `react-helmet-async`), unused components deleted (Cursor, AnimatedText, useCountUp, useMousePosition) — `e8ded8d`, `683facf`, `bb95031`, `e86fd3f`.

---

## 3. Lighthouse — before / after

Local production builds served with gzip (same server for both). Lighthouse 12.

| | Performance | Accessibility | Best practices | SEO | LCP | FCP | TBT |
|---|---|---|---|---|---|---|---|
| **Mobile, simulated** — before | 41 | 100 | 100 | 92 | 5.6 s | 4.6 s | 1,337 ms |
| **Mobile, simulated** — after | **96** | 100 | 100 | **100** | **2.5 s** | 1.8 s | 3 ms |
| **Mobile, real throttling** — before | 65 | — | — | — | 5.6 s | 1.6 s | 481 ms |
| **Mobile, real throttling** — after | **97** | — | — | — | **2.1 s** | 2.1 s | 12 ms |
| **Desktop** — before | 82 | 100 | 100 | 92 | 1.2 s | 1.0 s | 333 ms |
| **Desktop** — after | **99** | 100 | 100 | **100** | 0.8 s | 0.6 s | 0 ms |

Live site before any changes (for reference): mobile 39 / desktop 70.

Note: the simulated mobile LCP (2.52 s) is pessimistic for a local server — Lighthouse replays a trace where JS arrives within milliseconds and charges its execution to render delay, even though the prerendered photo no longer depends on JS. With real throttling, LCP = FCP (photo paints on first paint). **Confirm on [PageSpeed Insights](https://pagespeed.web.dev/) after deploy** — that's the authoritative number.

What moved the needle: Three.js no longer preloaded on every visit (963 kB), desktop-only 3D scenes loaded after idle, responsive AVIF/WebP photo with a matching preload, non-blocking fonts, LazyMotion, and build-time prerendering.

---

## 4. Contact section

The contact form was **removed by choice** (commit `feat(contact): remove form, show direct contact details`). The section now shows direct contact details only — Email (mailto), Phone / WhatsApp (tel), LinkedIn and GitHub as a 2×2 grid of cards on desktop and a single column on mobile — plus the availability line ("Open to senior Flutter roles — remote or Bangalore") and the response-time line. No third-party form service, and `react-hook-form` is uninstalled.

---

## 5. Nice to have (not applied)

| # | Item | Effort |
|---|---|---|
| N1 | Replace the stylised restaurant photo with a clean headshot on a plain background (then re-run `scripts/generate-images.py`) | S (your photo) |
| N2 | `Experience.jsx` `DOMAIN_COLORS` keys don't match data (`'E-Commerce'`, `'Health & Sports'`), so most cards share one colour | S |
| N3 | "Currently" line in hero/About (e.g. what you're working on now) | S |
| N4 | Content-Security-Policy + HSTS in `public/_headers` (CSP must allow Google Fonts and Cloudflare Insights) | M |
| N5 | Bump `public/sitemap.xml` `lastmod` on deploy (or generate it in the build) | S |
| N6 | Footer "Built with React · Three.js · Framer Motion" — drop or explain the choice on a Flutter-first site | S |
| N7 | Education line (B.E. Mechanical, Anna University, 2014–18) under Experience | S |
| N8 | Self-host fonts (removes the Google Fonts round trip entirely) | M |
| N9 | Resume link in the navbar | S |
