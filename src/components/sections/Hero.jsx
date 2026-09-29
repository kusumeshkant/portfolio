/**
 * Hero Section — Kusumeshkant Sharma
 * ─────────────────────────────────────
 * Layout:
 *  lg+:      text left, photo right
 *  < lg:     photo on top (compact), text below — single column so nothing
 *            clips at 360px or at tablet widths
 *
 * Performance:
 *  - The photo is the LCP element: responsive AVIF/WebP, preloaded in index.html.
 *  - The Three.js particle background loads only on large screens with a mouse
 *    and no reduced-motion preference, and only once the browser is idle.
 */
import { useState, useEffect, Suspense, lazy } from 'react'
import { m } from 'framer-motion'
import { ArrowRight, ChevronDown, Zap, MapPin, Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProfilePhoto from '@/components/ui/ProfilePhoto'
import { SITE_IDENTITY } from '@/data/navigation'
import { useRich3D } from '@/hooks/useMediaQuery'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

// Rendered width of the hero photo. Must match `imagesizes` on the preload in
// index.html, or the browser downloads a second file.
const PHOTO_SIZES = '(min-width: 1280px) 420px, (min-width: 1024px) 380px, (min-width: 640px) 288px, 224px'

const STATS = [
  { value: `${SITE_IDENTITY.yearsExperience}+`, label: 'Years' },
  { value: '6',    label: 'Play Store apps' },
  { value: '900+', label: 'Bank branches' },
]

/* Mount the 3D background only after the page has finished its critical work */
function useIdle() {
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1200))
    const cancel = window.cancelIdleCallback ?? clearTimeout
    const id = ric(() => setIdle(true), { timeout: 3000 })
    return () => cancel(id)
  }, [])
  return idle
}

/* ── Photo frame component ──────────────────────────────────────────── */
function HeroPhoto() {
  const bracket = '2px solid rgba(79,195,247,0.35)'
  const corners = [
    { top: '-1px', left: '-1px', borderTop: bracket, borderLeft: bracket },
    { top: '-1px', right: '-1px', borderTop: bracket, borderRight: bracket },
    { bottom: '-1px', left: '-1px', borderBottom: bracket, borderLeft: bracket },
    { bottom: '-1px', right: '-1px', borderBottom: bracket, borderRight: bracket },
  ]

  return (
    // Not animated in: this is the LCP element, so it must paint immediately.
    <div className="relative w-full">
      {/* Glow halo behind the photo */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          borderRadius: '24px',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(79,195,247,0.18) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: '20px',
          aspectRatio: '3/4',
          border: '1px solid rgba(79,195,247,0.12)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(79,195,247,0.04)',
        }}
      >
        <ProfilePhoto
          alt={`${SITE_IDENTITY.fullName}, ${SITE_IDENTITY.title}`}
          sizes={PHOTO_SIZES}
          priority
          style={{ objectPosition: 'center top', filter: 'contrast(1.04) saturate(0.88) brightness(0.94)' }}
        />

        {/* Side + top vignettes blend the photo background into the dark page */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(8,11,20,0.45) 0%, transparent 30%, transparent 70%, rgba(8,11,20,0.45) 100%), linear-gradient(180deg, rgba(8,11,20,0.3) 0%, transparent 20%)' }}
        />
        {/* Bottom gradient — fades into the page */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 45%, rgba(8,11,20,0.6) 75%, rgba(8,11,20,0.92) 100%)' }}
        />

        {/* Name badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <div
            className="rounded-xl px-3.5 py-2.5"
            style={{ background: 'rgba(8,11,20,0.78)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79,195,247,0.1)' }}
          >
            <p className="font-display font-semibold text-sm text-ink-primary leading-tight">
              {SITE_IDENTITY.fullName}
            </p>
            <p className="font-mono text-[11px] text-sky/80 mt-0.5">{SITE_IDENTITY.title}</p>
          </div>
        </div>
      </div>

      {/* Corner brackets */}
      {corners.map((style, i) => (
        <div key={i} className="absolute w-[18px] h-[18px]" style={style} />
      ))}
    </div>
  )
}

/* ── Hero section ───────────────────────────────────────────────────── */
export default function Hero() {
  const rich3D = useRich3D()
  const idle = useIdle()

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* 3D particle background — desktop only, after idle */}
      {rich3D && idle && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      {/* Atmospheric overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 20% -10%, rgba(79,195,247,0.10) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 85% 65%, rgba(139,92,246,0.06) 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080B14, transparent)' }}
      />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 section-container pt-24 pb-20">
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">

          {/* Left — text */}
          <div className="space-y-5 order-2 lg:order-1 min-w-0">

            {/* Location + availability */}
            <m.div {...fadeUp(0.1)} className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-sky/70" aria-hidden />
                <span className="font-mono text-xs text-ink-muted">{SITE_IDENTITY.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-flex w-1.5 h-1.5 rounded-full"
                  style={{ background: '#4FC3F7', boxShadow: '0 0 6px rgba(79,195,247,0.8)' }}
                  aria-hidden
                />
                <span className="font-mono text-xs text-sky/80">Available for work</span>
              </div>
            </m.div>

            {/* Name — one h1, two visual lines */}
            <m.h1
              {...fadeUp(0.2)}
              className="font-display font-bold leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 10vw, 5.2rem)' }}
            >
              <span className="block text-ink-primary">{SITE_IDENTITY.firstName}</span>
              <span className="block gradient-text">{SITE_IDENTITY.lastName}.</span>
            </m.h1>

            {/* Title */}
            <m.p {...fadeUp(0.3)} className="font-display">
              <span className="block text-lg md:text-2xl font-semibold text-sky">{SITE_IDENTITY.title}</span>
              <span className="block text-sm md:text-base text-ink-muted mt-1">· {SITE_IDENTITY.subtitle}</span>
            </m.p>

            {/* Tagline */}
            <m.p {...fadeUp(0.4)} className="text-ink-secondary text-base md:text-lg leading-relaxed max-w-xl">
              I build production Flutter apps for iOS and Android — from bank-grade lending
              at Equitas to smartwatch-synced health — with Clean Architecture, Riverpod and BLoC.
            </m.p>

            {/* CTAs */}
            <m.div {...fadeUp(0.5)} className="flex flex-wrap gap-3">
              <Button variant="primary" href="#projects">
                <Zap size={14} aria-hidden />
                View my work
              </Button>
              <Button variant="outline" href={SITE_IDENTITY.resume} download>
                <Download size={14} aria-hidden />
                Résumé (PDF)
              </Button>
              <Button variant="ghost" href="#contact">
                Contact
                <ArrowRight size={14} aria-hidden />
              </Button>
            </m.div>

            {/* Stat strip — real numbers in the markup, no count-up */}
            <m.dl
              {...fadeUp(0.6)}
              className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4"
              style={{ borderTop: '1px solid rgba(100,180,255,0.07)' }}
            >
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="font-mono text-[11px] text-ink-muted tracking-wider uppercase">{label}</dt>
                  <dd className="font-display font-bold text-xl text-ink-primary">{value}</dd>
                </div>
              ))}
            </m.dl>
          </div>

          {/* Right — photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-56 sm:w-72 lg:w-full" style={{ maxWidth: '420px' }}>
              <HeroPhoto />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator (desktop only — on mobile the content already continues below) */}
      <m.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-ink-muted"
      >
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase">Scroll</span>
        <m.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} aria-hidden />
        </m.span>
      </m.a>
    </section>
  )
}
