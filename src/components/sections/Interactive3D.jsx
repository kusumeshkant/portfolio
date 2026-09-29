/**
 * Interactive 3D Section
 * ──────────────────────
 * A full-width cinematic section with:
 *  - FloatingShapes canvas on the right half (mouse-responsive)
 *  - Left side: a "capabilities" list with animated line reveals
 *  - Horizontal rule with gradient glow separating top from bottom
 *
 * The 3D canvas is decorative and only renders on desktop with a mouse and
 * motion allowed; elsewhere the capabilities list takes the full width.
 */
import { Suspense, lazy } from 'react'
import { m } from 'framer-motion'
import { Layers, ShieldCheck, Bot, Users, Rocket } from 'lucide-react'
import { useRich3D } from '@/hooks/useMediaQuery'

const FloatingShapes = lazy(() => import('@/components/three/FloatingShapes'))

const CAPABILITIES = [
  {
    Icon: Layers,
    title: 'Architecture that scales',
    desc: 'Clean Architecture with Riverpod or BLoC — layered so teams ship features in parallel, as on Selfe Loans.',
  },
  {
    Icon: ShieldCheck,
    title: 'Secure by default',
    desc: 'Interceptor-level request/response encryption, OAuth 2.0, HMAC-signed webhooks and row-level security in production code.',
  },
  {
    Icon: Bot,
    title: 'Learning AI agents by building',
    desc: 'Personal projects on the Anthropic SDK: a multi-agent system on Claude and a human-in-the-loop approval app with an audit trail.',
  },
  {
    Icon: Users,
    title: 'Leads and mentors',
    desc: 'Mentored developers on Clean Architecture and state management, and ran code reviews across the mobile codebase.',
  },
  {
    Icon: Rocket,
    title: 'Ships end-to-end',
    desc: 'From Flutter UI to Node.js and Supabase backends, through to the App Store and Play Store release.',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Interactive3D() {
  const rich3D = useRich3D()

  return (
    <section className="relative py-section overflow-hidden">
      {/* Top divider glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky/20 to-transparent" />

      <div className="section-container">
        <div className={`grid gap-8 items-center ${rich3D ? 'md:grid-cols-2' : ''}`}>

          {/* ── Left: Capabilities ────────────────────────────────── */}
          <div>
            <m.p
              {...fadeUp(0)}
              className="font-mono text-xs tracking-[0.2em] text-sky/70 mb-4 uppercase"
            >
              05 / What I bring
            </m.p>

            <m.h2
              {...fadeUp(0.08)}
              className="font-display text-4xl md:text-5xl font-bold text-ink-primary mb-10 leading-[1.1]"
            >
              Built to ship,<br />
              <span className="gradient-text">designed to last.</span>
            </m.h2>

            <div className="space-y-6">
              {CAPABILITIES.map(({ Icon, title, desc }, i) => (
                <m.div
                  key={title}
                  {...fadeUp(0.15 + i * 0.1)}
                  className="flex gap-4 items-start"
                >
                  {/* Line accent */}
                  <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                    <div className="p-2 rounded-lg bg-sky/10 border border-sky/15">
                      <Icon size={14} className="text-sky" aria-hidden />
                    </div>
                    {i < CAPABILITIES.length - 1 && (
                      <div className="w-px h-8 bg-gradient-to-b from-sky/20 to-transparent" />
                    )}
                  </div>

                  <div className="pb-2">
                    <h3 className="font-display font-semibold text-ink-primary mb-1">{title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>

          {/* ── Right: 3D Canvas ──────────────────────────────────── */}
          {rich3D && (
            <m.div
              aria-hidden
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

              <Suspense
                fallback={
                  <div className="h-full flex items-center justify-center text-ink-muted font-mono text-xs">
                    Loading 3D scene…
                  </div>
                }
              >
                <FloatingShapes />
              </Suspense>
            </m.div>
          )}
        </div>
      </div>
    </section>
  )
}
