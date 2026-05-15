/**
 * Button
 * Two variants:
 *  - primary: subtle sky-blue gradient fill with glow on hover
 *  - outline: transparent, sky border, fills on hover
 *
 * Usage:
 *  <Button variant="primary" href="#contact">Hire Me</Button>
 *  <Button variant="outline" onClick={fn}>See Work</Button>
 */
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const base =
  'relative inline-flex items-center gap-2 rounded-xl px-6 py-3 font-display font-medium text-sm tracking-wide transition-all duration-300 focus-visible:outline-none cursor-none'

const variants = {
  primary: `
    bg-gradient-to-r from-sky to-[#81D4FA]
    text-bg font-semibold
    shadow-[0_0_0_0_rgba(79,195,247,0)]
    hover:shadow-[0_0_32px_rgba(79,195,247,0.35)]
    hover:scale-[1.03]
    active:scale-[0.98]
  `,
  outline: `
    border border-glass-border
    text-ink-secondary
    hover:border-sky/30
    hover:text-ink-primary
    hover:bg-sky/5
    hover:shadow-[0_0_20px_rgba(79,195,247,0.08)]
    active:scale-[0.98]
  `,
  ghost: `
    text-ink-muted
    hover:text-ink-primary
    hover:bg-white/5
  `,
}

export default function Button({
  children,
  variant = 'primary',
  href,
  className,
  ...props
}) {
  const classes = cn(base, variants[variant], className)

  // Render as anchor when href is provided
  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
