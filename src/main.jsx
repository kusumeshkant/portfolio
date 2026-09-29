/**
 * main.jsx — Application entry point
 *
 * React 18's createRoot API is used here (not the legacy render).
 * MotionConfig reducedMotion="user" makes every Framer Motion animation
 * respect the OS "reduce motion" setting (transforms are skipped, opacity kept).
 *
 * LazyMotion + the `m` component: the animation engine is fetched as a
 * separate chunk after first render, so the hero (and its LCP photo) paints
 * without waiting for it.
 */
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { LazyMotion, MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

const app = (
  <StrictMode>
    <LazyMotion features={() => import('./motion-features').then(mod => mod.default)} strict>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>
)

// Production builds are prerendered (scripts/prerender.mjs) → hydrate.
// The dev server serves an empty root → render from scratch.
const container = document.getElementById('root')
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
