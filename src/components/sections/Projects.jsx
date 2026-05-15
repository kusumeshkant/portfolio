/**
 * Projects Section — polished version
 * ─────────────────────────────────────
 * New: cursor-tracking gradient on cards (the "alive" effect from Stripe/Linear).
 * When the mouse moves over a card, a soft radial gradient follows the cursor,
 * revealing depth from the card surface. Framer Motion tracks the mouse position
 * and animates it smoothly.
 */
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import { FEATURED_PROJECTS, STANDARD_PROJECTS } from '@/data/projects'

/* Card with cursor-tracking radial gradient */
function ProjectCard({ project, featured = false, index = 0 }) {
  const { name, tagline, domain, description, tech, color, links, stat } = project
  const cardRef = useRef(null)

  // Mouse position relative to card — for the gradient follow effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    // Push the gradient off-card so it disappears
    mouseX.set(-200)
    mouseY.set(-200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        ref={cardRef}
        className="glass-card-glow h-full flex flex-col overflow-hidden relative group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cursor-tracking radial gradient — "alive" card effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(300px circle at ${smoothX}px ${smoothY}px, ${color}12, transparent 60%)`,
          }}
        />

        {/* Color accent top bar */}
        <div
          className="h-[1.5px] w-full flex-shrink-0"
          style={{ background: `linear-gradient(90deg, ${color}90, transparent)` }}
        />

        {/* Card content */}
        <div className={`flex flex-col flex-1 relative ${featured ? 'p-7' : 'p-5'} gap-4`}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span
                className="inline-block tag-pill text-[10px] mb-2"
                style={{ backgroundColor: `${color}14`, borderColor: `${color}30`, color }}
              >
                {domain}
              </span>
              <h3
                className={`font-display font-bold text-ink-primary ${featured ? 'text-xl' : 'text-base'}`}
              >
                {name}
              </h3>
              <p className="text-ink-muted text-xs mt-1 font-mono">{tagline}</p>
            </div>

            {/* Stat */}
            <div className="text-right flex-shrink-0">
              <p className="font-display font-bold text-xl" style={{ color }}>
                {stat.value}
              </p>
              <p className="text-ink-muted text-[10px] font-mono">{stat.label}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-ink-muted text-sm leading-relaxed flex-1">{description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {tech.map(t => (
              <Badge key={t} color={color}>{t}</Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-1 border-t border-glass-border">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ink-muted hover:text-ink-primary transition-colors text-xs font-mono"
            >
              <Github size={12} /> Code
            </a>
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono hover:opacity-100 transition-opacity"
              style={{ color, opacity: 0.75 }}
            >
              <ExternalLink size={12} /> Live Demo
            </a>
            {/* Hover arrow — appears on card hover */}
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight size={14} className="text-ink-muted" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-section relative overflow-hidden">
      {/* Glow blob */}
      <div
        className="absolute w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-1/4 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,195,247,0.05), transparent 70%)', filter: 'blur(60px)' }}
        aria-hidden
      />

      <div className="section-container">
        <SectionHeader
          label="04 / Projects"
          title={<>Work that <span className="gradient-text">speaks.</span></>}
          subtitle="Six production-grade projects across fintech, healthcare, AI, and real-time systems. Move your mouse over the cards."
        />

        {/* Featured row */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} featured index={i} />
          ))}
        </div>

        {/* Standard grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STANDARD_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
