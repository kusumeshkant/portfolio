/**
 * Skills Section
 * ─────────────
 * Layout:
 *  Top half  → TechGlobe (3D rotating skill sphere)
 *  Bottom    → Category accordion with animated progress bars
 *
 * Animation approach:
 *  - Progress bars animate from 0 → level% when they scroll into view
 *  - Uses Framer Motion's animate prop triggered by whileInView
 */
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import { SKILL_CATEGORIES } from '@/data/skills'

const TechGlobe = lazy(() => import('@/components/three/TechGlobe'))

/* Progress bar for an individual skill */
function SkillBar({ name, level, tag, delay = 0 }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-ink-secondary text-sm font-body">{name}</span>
          {tag && (
            <span className="tag-pill text-[10px] px-2 py-0.5">{tag}</span>
          )}
        </div>
        <span className="font-mono text-xs text-ink-muted">{level}%</span>
      </div>

      {/* Track */}
      <div className="h-1 bg-bg-raised rounded-full overflow-hidden">
        {/* Fill — animates from 0 to level on scroll */}
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sky to-violet"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

/* One skill category panel */
function CategoryCard({ id, label, icon, skills, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard glow className="p-6 space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h3 className="font-display font-semibold text-ink-primary">{label}</h3>
        </div>

        <div className="space-y-4">
          {skills.map((skill, i) => (
            <SkillBar key={skill.name} {...skill} delay={index * 0.08 + i * 0.06} />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default function Skills() {
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
          subtitle="10+ technologies across mobile, web, backend, and cloud — each chosen deliberately, each battle-tested in production."
        />

        {/* 3D Globe */}
        <div className="mb-16">
          <Suspense
            fallback={
              <div className="h-[420px] flex items-center justify-center text-ink-muted font-mono text-xs">
                Loading 3D scene…
              </div>
            }
          >
            <TechGlobe />
          </Suspense>
        </div>

        {/* Skill cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} {...cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
