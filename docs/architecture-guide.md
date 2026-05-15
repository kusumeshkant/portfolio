# Architecture Guide

## Component Hierarchy

```
App.jsx
├── Cursor (custom cursor — desktop only)
├── Navbar (scroll progress + mobile drawer)
├── main
│   ├── Hero (eager — above fold, loads immediately)
│   └── [lazy sections via React.lazy + Suspense]
│       ├── About
│       ├── Skills
│       ├── Experience
│       ├── Projects
│       ├── Interactive3D
│       └── Contact
└── Footer
```

## Code Splitting Strategy

The bundle is split into vendor chunks to maximise cache hit rates:

| Chunk | Contents | ~Size (gzip) |
|---|---|---|
| `three-vendor` | Three.js + R3F + Drei | ~267KB |
| `motion-vendor` | Framer Motion | ~41KB |
| `react-vendor` | React + React-DOM | minimal |
| `index` | App code | ~20KB |

Each section is also lazy-loaded (separate JS chunk), so below-fold sections don't block the initial paint.

## Design Token System

All design tokens live in `tailwind.config.js`:

```js
colors: {
  bg: {
    DEFAULT: '#080B14',   // page background
    surface: '#0D1117',   // card surfaces
    raised: '#131C2E',    // raised elements
  },
  sky:    '#4FC3F7',      // primary accent
  violet: '#8B5CF6',      // secondary accent
  ink: {
    primary:   '#F0F6FC', // headings
    secondary: '#B0BEC5', // body text
    muted:     '#7D8590', // subtext
    faint:     '#484F58', // disabled/decorative
  },
}
```

## 3D Scenes

All Three.js code is isolated in `src/components/three/`:

- **HeroScene** — 1800-particle system + wireframe icosahedron. Canvas fills the hero section behind the content.
- **TechGlobe** — Wireframe sphere with HTML tech labels at lat/lon positions. Used in the Interactive3D section.
- **FloatingShapes** — Octahedron, icosahedron, tetrahedron, torus. Camera rig follows mouse via lerp.

All scenes use `dpr={[1, 1.5]}` to cap pixel ratio — prevents 4× overdraw on Retina displays.

## Animation System

All scroll animations use `whileInView` with `viewport: { once: true }` — animations run once when the element enters the viewport, never again. This avoids jank on scroll-back.

Spring presets used throughout:
```js
transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }  // ease out expo
```

## Content Data Layer

All site content is in `src/data/`. No content is hardcoded in components.

| File | Contents |
|---|---|
| `navigation.js` | Name, email, phone, social links, nav items |
| `skills.js` | Skill categories, proficiency levels, globe nodes |
| `experience.js` | Work history, companies, tech used |
| `projects.js` | Projects, links, stats, featured flag |

To update any content: edit the data file only. Components read from these files.

## Photo Integration

`public/me.jpeg` is used in Hero and About sections. CSS strategy:

- `object-position: center 12%` — keeps face in frame when cropped to 3:4
- `filter: contrast(1.04) saturate(0.88) brightness(0.94)` — subtle cool-tone blend
- Radial gradient vignettes on left/right edges — hides background, blends into dark UI
- Bottom gradient fade — no hard photo edge against the page
