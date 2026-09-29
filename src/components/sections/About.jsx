/**
 * About Section — Kusumeshkant Sharma
 * ─────────────────────────────────────
 * Photo composition for this section:
 *  - Shows upper body / face prominently (object-position: center 30% of the 3:4 crop)
 *  - Left/right gradients blend the background into the dark card
 *  - Name badge anchored at bottom-left
 */
import { motion } from 'framer-motion'
import { Smartphone, Layers, Bot, Server, CheckCircle2 } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import ProfilePhoto from '@/components/ui/ProfilePhoto'
import { SITE_IDENTITY } from '@/data/navigation'

const PILLARS = [
  { Icon: Smartphone, label: 'Mobile',         desc: 'Flutter · Dart · iOS · Android' },
  { Icon: Layers,     label: 'Architecture',   desc: 'Clean Arch · Riverpod · BLoC'   },
  { Icon: Bot,        label: 'AI & Agents',    desc: 'Anthropic SDK · Claude API'     },
  { Icon: Server,     label: 'Backend & Cloud', desc: 'Supabase · Firebase · Node.js' },
]

// Static values (no count-up) so crawlers, no-JS and reduced-motion users see real numbers
const STATS = [
  { value: `${SITE_IDENTITY.yearsExperience}+`, label: 'Years with Flutter'    },
  { value: '6',    label: 'Play Store apps shipped' },
  { value: '900+', label: 'Bank branches (Selfe Loans)' },
  { value: '8',    label: 'AI agents orchestrated'  },
]

const HIGHLIGHTS = [
  'Architected Selfe Loans for Equitas Small Finance Bank — 900+ branch integrations',
  'Owned the App Store + Play Store release pipeline',
  'Smartwatch sync — Google Health Connect + Apple HealthKit',
  'Mentored developers and led code reviews at Joola',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

function StatCard({ value, label }) {
  return (
    <GlassCard className="p-4 text-center">
      <p className="font-display font-bold text-2xl mb-0.5 gradient-text">{value}</p>
      <p className="text-ink-muted text-xs font-mono">{label}</p>
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
        <div style={{ height: '380px' }}>
          <ProfilePhoto
            alt={SITE_IDENTITY.fullName}
            sizes="(min-width: 768px) 560px, 100vw"
            style={{ objectPosition: 'center 30%', filter: 'contrast(1.04) saturate(0.87) brightness(0.94)' }}
          />
        </div>

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
        <div className="absolute bottom-3 left-3 right-3">
          <div
            className="rounded-[10px] px-3 py-2"
            style={{ background: 'rgba(8,11,20,0.80)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79,195,247,0.10)' }}
          >
            <p className="font-display font-semibold text-sm text-ink-primary">{SITE_IDENTITY.fullName}</p>
            <p className="font-mono text-[11px] text-sky/80 mt-0.5">{SITE_IDENTITY.tagline}</p>
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
              I'm <span className="text-ink-primary font-medium">{SITE_IDENTITY.fullName}</span> — a
              Senior Flutter Developer in Bangalore with {SITE_IDENTITY.yearsExperience}+ years shipping
              production iOS and Android apps across fintech, health and e-commerce. I architect with
              Clean Architecture and Riverpod/BLoC, and own releases end-to-end — from the first PR to
              the App Store and Play Store.
            </motion.p>

            <motion.p {...fadeUp(0.1)} className="text-ink-muted leading-relaxed">
              I built the Selfe Loans app that Equitas Small Finance Bank used to process loan
              applications across 900+ branches, led the 150+ Health app with smartwatch sync on both
              platforms, and mentor developers through code reviews. I also build at the AI layer: an
              8-agent orchestration system on the Anthropic SDK, and Cockpit — a Flutter + Supabase
              console for approving AI-agent actions from anywhere.
            </motion.p>

            {/* Checklist */}
            <motion.ul {...fadeUp(0.18)} className="space-y-2.5">
              {HIGHLIGHTS.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-ink-muted text-sm">
                  <CheckCircle2 size={14} className="text-sky mt-0.5 flex-shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </motion.ul>

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
                    <Icon size={13} className="text-sky" aria-hidden />
                  </div>
                  <div>
                    <p className="text-ink-primary font-display font-semibold text-sm">{label}</p>
                    <p className="text-ink-muted text-xs mt-0.5 font-mono">{desc}</p>
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

            <motion.div {...fadeUp(0.24)} className="grid grid-cols-2 gap-3">
              {STATS.map(stat => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
