/**
 * Navbar
 * Fixed top navigation with:
 *  - Scroll progress bar (thin sky line across the top)
 *  - Logo (DQ)
 *  - Desktop nav links with active highlight
 *  - Hire Me CTA button
 *  - Mobile hamburger menu with animated drawer
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS, SITE_IDENTITY } from '@/data/navigation'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const progress = useScrollProgress()

  // Add a glass background once the user scrolls past the hero
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on any nav click
  const close = () => setMobileOpen(false)

  return (
    <>
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100]">
        <motion.div
          className="h-full bg-gradient-to-r from-sky via-violet to-sky"
          style={{ scaleX: progress, transformOrigin: 'left' }}
        />
      </div>

      {/* Nav bar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg/80 backdrop-blur-glass border-b border-glass-border'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between h-16">
          {/* Logo — initials monogram */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(79,195,247,0.15), rgba(139,92,246,0.15))',
                border: '1px solid rgba(79,195,247,0.2)',
              }}
            >
              <span className="gradient-text">{SITE_IDENTITY.initials}</span>
            </div>
            <span className="font-display font-semibold text-sm text-ink-primary hidden sm:block group-hover:text-sky transition-colors duration-200">
              {SITE_IDENTITY.firstName}
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-body text-sm text-ink-muted hover:text-ink-primary transition-colors duration-200 relative group"
              >
                {label}
                {/* Underline reveal on hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-sky group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="primary" href="#contact" className="text-xs px-4 py-2">
              Hire Me
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-ink-muted hover:text-ink-primary transition-colors cursor-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 glass-card rounded-none border-x-0 border-t-0 md:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={close}
                  className="text-ink-secondary hover:text-sky transition-colors text-lg font-body"
                >
                  {label}
                </a>
              ))}
              <Button variant="primary" href="#contact" onClick={close} className="mt-2 w-full justify-center">
                Hire Me
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
