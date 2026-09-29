/**
 * Skills Section
 * ─────────────
 * Layout:
 *  Top    → TechGlobe (3D rotating skill sphere) — desktop with a mouse only
 *  Bottom → Category cards with grouped skill tags (no self-rated percentages)
 */
import { Suspense, lazy } from 'react'
import { m } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import { SKILL_CATEGORIES, TOOLS } from '@/data/skills'
import { useRich3D } from '@/hooks/useMediaQuery'

const TechGlobe = lazy(() => import('@/components/three/TechGlobe'))

/* One skill category panel */
function CategoryCard({ label, icon, skills, index }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard glow className="p-6 space-y-4 h-full">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden>{icon}</span>
          <h3 className="font-display font-semibold text-ink-primary">{label}</h3>
        </div>

        <ul className="flex flex-wrap gap-2">
          {skills.map(({ name, core }) => (
            <li
              key={name}
              className={`tag-pill ${core ? '' : 'opacity-80'}`}
              style={core ? undefined : { background: 'rgba(125,133,144,0.08)', borderColor: 'rgba(125,133,144,0.2)', color: '#C9D1D9' }}
            >
              {name}
            </li>
          ))}
        </ul>
      </GlassCard>
    </m.div>
  )
}

export default function Skills() {
  const rich3D = useRich3D()

  return (
    <section
      id="skills"
      className="py-section relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(13,17,23,0.5) 30%, rgba(13,17,23,0.5) 70%, transparent 100%)' }}
    >
      {/* Background glow */}
      <div
        className="glow-dot w-[600px] h-[600px] bg-violet/10 -right-40 top-1/2 -translate-y-1/2"
        aria-hidden
      />

      <div className="section-container">
        <SectionHeader
          label="02 / Skills"
          title={<>The <span className="gradient-text">stack</span> behind the work</>}
          subtitle="Flutter first. Everything else is here because a shipped product needed it."
        />

        {/* 3D Globe — decorative, desktop only */}
        {rich3D && (
          <div className="mb-16" aria-hidden>
            <Suspense fallback={<div className="h-[520px]" />}>
              <TechGlobe />
            </Suspense>
          </div>
        )}

        {/* Skill cards grid — highlighted tags are used most in production */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} {...cat} index={i} />
          ))}
        </div>

        <p className="mt-6 text-ink-muted text-sm font-mono">
          Tools: {TOOLS.join(' · ')}
        </p>
      </div>
    </section>
  )
}
