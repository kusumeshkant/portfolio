/**
 * Experience Section — vertical timeline
 * ─────────────────────────────────────
 * Design:
 *  - Single vertical line runs down the center (desktop) / left (mobile)
 *  - Each entry alternates left/right on desktop (zigzag layout)
 *  - Animated connector dot pulses when the entry enters the viewport
 *  - Glass card per entry with: period, domain tag, role, description, tech badges, highlight stat
 */
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import { EXPERIENCES } from '@/data/experience'
import { TrendingUp } from 'lucide-react'

/* Domain → accent colour */
const DOMAIN_COLORS = {
  'Fintech':     '#4FC3F7',
  'Healthcare':  '#34D399',
  'E-commerce':  '#F59E0B',
  'Social Media':'#EC4899',
  'AgriTech':    '#84CC16',
}

function ExperienceCard({ experience, index }) {
  const { period, role, domain, description, tech, highlight } = experience
  const color = DOMAIN_COLORS[domain] ?? '#4FC3F7'
  const isEven = index % 2 === 0

  return (
    <div className={`relative flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* ── Connector dot + line ─────────────────────────────── */}
      <div className="absolute left-0 md:left-1/2 top-6 flex flex-col items-center -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="w-3 h-3 rounded-full border-2"
          style={{ borderColor: color, backgroundColor: `${color}20`, boxShadow: `0 0 12px ${color}50` }}
        />
      </div>

      {/* ── Card ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -32 : 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full pl-8 md:pl-0 ${isEven ? 'md:pr-12 md:w-[calc(50%-1.5rem)]' : 'md:pl-12 md:w-[calc(50%-1.5rem)] md:ml-auto'}`}
      >
        <GlassCard glow className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="font-mono text-xs tracking-widest mb-2" style={{ color }}>
                {period}
              </p>
              <h3 className="font-display font-semibold text-ink-primary text-lg">{role}</h3>
            </div>
            <span
              className="tag-pill"
              style={{ backgroundColor: `${color}12`, borderColor: `${color}30`, color }}
            >
              {domain}
            </span>
          </div>

          {/* Description */}
          <p className="text-ink-muted text-sm leading-relaxed">{description}</p>

          {/* Highlight stat */}
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color }}>
            <TrendingUp size={12} />
            <span>{highlight}</span>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tech.map(t => (
              <Badge key={t} color={color}>{t}</Badge>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-section relative">
      {/* Left glow */}
      <div className="glow-dot w-[400px] h-[400px] bg-sky/8 -left-32 top-1/3" aria-hidden />

      <div className="section-container">
        <SectionHeader
          label="03 / Experience"
          title={<>A track record<br />of <span className="gradient-text">shipping.</span></>}
          subtitle="From IoT sensors to payment processors — production experience across the stack and across industries."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — hidden on mobile, shown on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-glass-border to-transparent" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
