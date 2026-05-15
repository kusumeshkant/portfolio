/**
 * Interactive 3D Section
 * ──────────────────────
 * A full-width cinematic section with:
 *  - FloatingShapes canvas on the right half (mouse-responsive)
 *  - Left side: a "capabilities" list with animated line reveals
 *  - Horizontal rule with gradient glow separating top from bottom
 *
 * The camera in FloatingShapes shifts with the mouse → feels immersive without
 * being gimmicky. You're a senior engineer, not a gaming studio.
 */
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Layers, Cpu, Globe, Zap } from 'lucide-react'

const FloatingShapes = lazy(() => import('@/components/three/FloatingShapes'))

const CAPABILITIES = [
  {
    Icon: Cpu,
    title: 'Architecture that scales',
    desc: 'Microservices, serverless, monoliths — I design for the right complexity level.',
  },
  {
    Icon: Layers,
    title: 'Full-spectrum delivery',
    desc: 'From mobile UI to database schema, I own the whole feature end-to-end.',
  },
  {
    Icon: Globe,
    title: 'Cross-platform expertise',
    desc: 'One codebase targeting iOS, Android, and Web with Flutter and React.',
  },
  {
    Icon: Zap,
    title: 'Performance obsessed',
    desc: 'Sub-100ms responses, 60fps UI, and Lighthouse 90+ on every launch.',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Interactive3D() {
  return (
    <section className="relative py-section overflow-hidden">
      {/* Top divider glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky/20 to-transparent" />

      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* ── Left: Capabilities ────────────────────────────────── */}
          <div>
            <motion.p
              {...fadeUp(0)}
              className="font-mono text-xs tracking-[0.2em] text-sky/70 mb-4 uppercase"
            >
              05 / What I bring
            </motion.p>

            <motion.h2
              {...fadeUp(0.08)}
              className="font-display text-4xl md:text-5xl font-bold text-ink-primary mb-10 leading-[1.1]"
            >
              Built to ship,<br />
              <span className="gradient-text">designed to last.</span>
            </motion.h2>

            <div className="space-y-6">
              {CAPABILITIES.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp(0.15 + i * 0.1)}
                  className="flex gap-4 items-start"
                >
                  {/* Line accent */}
                  <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                    <div className="p-2 rounded-lg bg-sky/10 border border-sky/15">
                      <Icon size={14} className="text-sky" />
                    </div>
                    {i < CAPABILITIES.length - 1 && (
                      <div className="w-px h-8 bg-gradient-to-b from-sky/20 to-transparent" />
                    )}
                  </div>

                  <div className="pb-2">
                    <h3 className="font-display font-semibold text-ink-primary mb-1">{title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: 3D Canvas ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-[480px] relative rounded-2xl overflow-hidden border border-glass-border"
          >
            {/* Frame corners */}
            <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-sky/30 z-10" />
            <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-sky/30 z-10" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-sky/30 z-10" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-sky/30 z-10" />

            {/* Mono label */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="font-mono text-[9px] text-sky/40 tracking-widest uppercase">
                interactive · move mouse
              </span>
            </div>

            <Suspense
              fallback={
                <div className="h-full flex items-center justify-center text-ink-muted font-mono text-xs">
                  Loading 3D scene…
                </div>
              }
            >
              <FloatingShapes />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
