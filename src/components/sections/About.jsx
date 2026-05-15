/**
 * About Section — Kusumeshkant Sharma
 * ─────────────────────────────────────
 * Photo composition for this section:
 *  - Shows upper body / face prominently (object-position: center 18%)
 *  - Left/right gradients blend the background into the dark card
 *  - Name badge anchored at bottom-left
 */
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Server, Smartphone, Cloud, CheckCircle2 } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import { useCountUp } from '@/hooks/useCountUp'
import { SITE_IDENTITY } from '@/data/navigation'

const PILLARS = [
  { Icon: Smartphone, label: 'Mobile',   desc: 'Flutter · Dart'       },
  { Icon: Code2,      label: 'Frontend',  desc: 'React · TypeScript'   },
  { Icon: Server,     label: 'Backend',   desc: 'Node.js · GraphQL'    },
  { Icon: Cloud,      label: 'Cloud',     desc: 'AWS · Azure · Firebase'   },
]

const STATS = [
  { value: 6,  suffix: '+', label: 'Years experience' },
  { value: 20, suffix: '+', label: 'Projects shipped'  },
  { value: 5,  suffix: '',  label: 'Industries served' },
  { value: 10, suffix: '+', label: 'Technologies'      },
]

const HIGHLIGHTS = [
  'Production Flutter apps live on Google Play Store',
  'Fintech platform — 900+ Equitas Bank branch integrations',
  'Smartwatch sync (Google Fit + Apple HealthKit)',
  'AWS S3 cloud storage with role-based access control',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

function StatCard({ value, suffix, label, active }) {
  const count = useCountUp(value, active)
  return (
    <GlassCard className="p-4 text-center">
      <p
        className="font-display font-bold text-2xl mb-0.5"
        style={{
          background: 'linear-gradient(135deg, #4FC3F7 0%, #8B5CF6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {count}{suffix}
      </p>
      <p className="text-ink-muted text-[11px] font-mono">{label}</p>
    </GlassCard>
  )
}

function AboutPhoto() {
  return (
    <div className="relative">
      {/* Glow behind photo */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-16px',
          borderRadius: '20px',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(79,195,247,0.12), transparent 70%)',
          filter: 'blur(24px)',
          zIndex: 0,
        }}
      />

      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: '18px',
          border: '1px solid rgba(79,195,247,0.10)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
          zIndex: 1,
        }}
      >
        <img
          src="/me.jpeg"
          alt="Kusumeshkant Sharma"
          style={{
            width: '100%',
            height: '380px',
            objectFit: 'cover',
            /*
             * For the About section we show head + upper body (wider composition).
             * center 18% keeps face visible and shows confident posture.
             */
            objectPosition: 'center 18%',
            display: 'block',
            filter: 'contrast(1.04) saturate(0.87) brightness(0.94)',
          }}
          loading="lazy"
        />

        {/* Side vignettes — blend processed background into dark UI */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(8,11,20,0.5) 0%, transparent 25%, transparent 75%, rgba(8,11,20,0.5) 100%)',
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,11,20,0.15) 0%, transparent 20%, transparent 55%, rgba(8,11,20,0.75) 90%, rgba(8,11,20,0.95) 100%)',
          }}
        />

        {/* Name badge */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div
            style={{
              background: 'rgba(8,11,20,0.80)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(79,195,247,0.10)',
              borderRadius: '10px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '12px', color: '#F0F6FC' }}>
                Kusumeshkant Sharma
              </p>
              <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'rgba(79,195,247,0.6)', marginTop: '2px' }}>
                Full Stack Engineer
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '5px', height: '5px',
                  borderRadius: '50%',
                  background: '#4FC3F7',
                  boxShadow: '0 0 5px rgba(79,195,247,0.8)',
                  animation: 'pulse-glow 2.5s ease-in-out infinite',
                }}
              />
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: 'rgba(79,195,247,0.5)' }}>Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner brackets */}
      {[
        { top: '-1px', left: '-1px', borderTop: '2px solid rgba(79,195,247,0.3)', borderLeft: '2px solid rgba(79,195,247,0.3)' },
        { top: '-1px', right: '-1px', borderTop: '2px solid rgba(79,195,247,0.3)', borderRight: '2px solid rgba(79,195,247,0.3)' },
        { bottom: '-1px', left: '-1px', borderBottom: '2px solid rgba(79,195,247,0.3)', borderLeft: '2px solid rgba(79,195,247,0.3)' },
        { bottom: '-1px', right: '-1px', borderBottom: '2px solid rgba(79,195,247,0.3)', borderRight: '2px solid rgba(79,195,247,0.3)' },
      ].map((style, i) => (
        <div key={i} style={{ position: 'absolute', width: '16px', height: '16px', zIndex: 2, ...style }} />
      ))}
    </div>
  )
}

export default function About() {
  const statsRef = useRef(null)
  const statsVisible = useInView(statsRef, { once: true, margin: '-60px' })

  return (
    <section
      id="about"
      className="py-section"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(13,17,23,0.4) 50%, transparent 100%)' }}
    >
      <div className="section-container">
        <SectionHeader
          label="01 / About"
          title={<>I build systems<br />that <span className="gradient-text">actually scale.</span></>}
        />

        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left: Bio ──────────────────────────────────────── */}
          <div className="space-y-6">
            <motion.p {...fadeUp(0)} className="text-ink-secondary text-lg leading-relaxed">
              I'm <span className="text-ink-primary font-medium">Kusumeshkant Sharma</span> — a Full Stack
              Engineer with 6+ years shipping production systems across fintech,
              health, e-commerce, and cloud storage. I own the full stack: Flutter UI to
              cloud infrastructure.
            </motion.p>

            <motion.p {...fadeUp(0.1)} className="text-ink-muted leading-relaxed">
              I've processed real loan applications for Equitas Small Finance Bank,
              built cross-platform wearable integrations, and shipped apps used
              across India and the UK. Code that runs in production — not prototypes.
            </motion.p>

            {/* Checklist */}
            <motion.ul {...fadeUp(0.18)} className="space-y-2.5">
              {HIGHLIGHTS.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-ink-muted text-sm">
                  <CheckCircle2 size={14} className="text-sky mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.p {...fadeUp(0.26)} className="text-ink-muted text-sm">
              Available on{' '}
              <a href="https://fiverr.com/kusumeshkant" target="_blank" rel="noopener noreferrer"
                className="text-sky hover:text-sky/80 font-mono transition-colors">Fiverr</a>{' '}
              for freelance · Open to senior roles globally ·{' '}
              <a href="tel:+918884133322" className="text-sky/70 hover:text-sky font-mono transition-colors">
                {SITE_IDENTITY.phone}
              </a>
            </motion.p>

            {/* Tech pillars */}
            <motion.div {...fadeUp(0.34)} className="grid grid-cols-2 gap-2.5">
              {PILLARS.map(({ Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl border transition-colors duration-300"
                  style={{ background: 'rgba(19,28,46,0.4)', borderColor: 'rgba(100,180,255,0.07)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,195,247,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(100,180,255,0.07)'}
                >
                  <div className="mt-0.5 p-1.5 rounded-lg" style={{ background: 'rgba(79,195,247,0.1)' }}>
                    <Icon size={13} className="text-sky" />
                  </div>
                  <div>
                    <p className="text-ink-primary font-display font-semibold text-sm">{label}</p>
                    <p className="text-ink-muted text-[11px] mt-0.5 font-mono">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Photo + Stats ────────────────────────── */}
          <div className="space-y-5">
            <motion.div {...fadeUp(0.14)}>
              <AboutPhoto />
            </motion.div>

            <motion.div ref={statsRef} {...fadeUp(0.24)} className="grid grid-cols-2 gap-3">
              {STATS.map(stat => (
                <StatCard key={stat.label} {...stat} active={statsVisible} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
