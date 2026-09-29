/**
 * SectionHeader
 * Consistent heading block used by every section.
 * Animates in from below when it enters the viewport.
 *
 * Props:
 *  label   – small mono tag above the main title  e.g. "02 / Skills"
 *  title   – large headline text
 *  subtitle – optional paragraph below the title
 */
import { m } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

export default function SectionHeader({ label, title, subtitle, className = '' }) {
  return (
    <div className={`mb-16 ${className}`}>
      {label && (
        <m.p
          {...fadeUp(0)}
          className="font-mono text-xs tracking-[0.2em] text-sky/70 mb-4 uppercase"
        >
          {label}
        </m.p>
      )}

      <m.h2
        {...fadeUp(0.08)}
        className="font-display text-4xl md:text-5xl font-bold text-ink-primary leading-[1.1]"
      >
        {title}
      </m.h2>

      {subtitle && (
        <m.p
          {...fadeUp(0.16)}
          className="mt-5 text-ink-muted max-w-2xl text-lg leading-relaxed"
        >
          {subtitle}
        </m.p>
      )}
    </div>
  )
}
