/**
 * Hero Section — Kusumeshkant Sharma
 * ─────────────────────────────────────
 * Photo composition analysis (me.jpeg):
 *  - Portrait orientation ~700×1400px
 *  - Face at ~15% from the top
 *  - Dark clothing (black shirt) → blends into dark UI naturally
 *  - Full body shot — confident professional stance
 *
 * CSS strategy for the photo:
 *  - object-position: center 12% → face and upper body in frame
 *  - Strong left+right vignette → hides processed background, blends to dark
 *  - Bottom gradient → fades out, no hard edge with the page
 *  - Very subtle filter → keeps skin tones realistic, matches cool palette
 *
 * Layout:
 *  Desktop: 55/45 split — text left, photo right
 *  Mobile:  compact photo top (face visible), text below
 */
import { useState, useEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Zap, MapPin, Star, Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SITE_IDENTITY } from '@/data/navigation'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

const ROLES = [
  'Full Stack Engineer',
  'Flutter Developer',
  'React.js Architect',
  'Backend Engineer',
  'AI-First Developer',
]

/* ── Photo frame component ──────────────────────────────────────────── */
function HeroPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 56, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* ── Glow halo behind the photo ────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          borderRadius: '24px',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(79,195,247,0.18) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

      {/* ── Photo container ──────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: '20px',
          aspectRatio: '3/4',
          border: '1px solid rgba(79,195,247,0.12)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(79,195,247,0.04)',
          zIndex: 1,
        }}
      >
        {/* The real photo */}
        <img
          src="/me.jpeg"
          alt="Kusumeshkant Sharma — Full Stack Engineer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            /*
             * Face is at ~15% from top in the original image.
             * "center 12%" keeps face + shoulders in any cropped frame.
             */
            objectPosition: 'center 12%',
            display: 'block',
            /*
             * Very subtle filter:
             *  - contrast(1.04) → slight crispness
             *  - saturate(0.88) → desaturates slightly to match cool palette
             *  - brightness(0.94) → darkens slightly to blend into dark UI
             * Does NOT make him look unnatural — test at 1080p to verify.
             */
            filter: 'contrast(1.04) saturate(0.88) brightness(0.94)',
          }}
          loading="eager"
          fetchPriority="high"
        />

        {/*
         * Left vignette — blends the processed restaurant background
         * into the dark page. Dark clothing helps: body merges naturally.
         */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(8,11,20,0.45) 0%, transparent 30%, transparent 70%, rgba(8,11,20,0.45) 100%)',
          }}
        />

        {/* Top vignette — softens the background above the head */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(8,11,20,0.3) 0%, transparent 20%)',
          }}
        />

        {/* Bottom gradient — fades into the page smoothly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 45%, rgba(8,11,20,0.6) 75%, rgba(8,11,20,0.92) 100%)',
          }}
        />

        {/* Name badge at the bottom of the photo */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div
            style={{
              background: 'rgba(8,11,20,0.78)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(79,195,247,0.1)',
              borderRadius: '12px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#F0F6FC',
                  lineHeight: 1.2,
                }}
              >
                Kusumeshkant Sharma
              </p>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '10px',
                  color: 'rgba(79,195,247,0.65)',
                  marginTop: '2px',
                }}
              >
                Full Stack Engineer
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4FC3F7',
                  boxShadow: '0 0 6px rgba(79,195,247,0.8)',
                }}
              />
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '9px',
                  color: 'rgba(79,195,247,0.55)',
                  letterSpacing: '0.08em',
                }}
              >
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Corner brackets ──────────────────────────────────────── */}
      {[
        { top: 0,    left: 0,    borderStyle: 'borderTopWidth: 2px; borderLeftWidth: 2px' },
        { top: 0,    right: 0 },
        { bottom: 0, left: 0 },
        { bottom: 0, right: 0 },
      ].map((_, i) => {
        const corners = [
          { top: '-1px', left: '-1px', borderTop: '2px solid rgba(79,195,247,0.35)', borderLeft: '2px solid rgba(79,195,247,0.35)' },
          { top: '-1px', right: '-1px', borderTop: '2px solid rgba(79,195,247,0.35)', borderRight: '2px solid rgba(79,195,247,0.35)' },
          { bottom: '-1px', left: '-1px', borderBottom: '2px solid rgba(79,195,247,0.35)', borderLeft: '2px solid rgba(79,195,247,0.35)' },
          { bottom: '-1px', right: '-1px', borderBottom: '2px solid rgba(79,195,247,0.35)', borderRight: '2px solid rgba(79,195,247,0.35)' },
        ]
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '18px',
              height: '18px',
              zIndex: 2,
              ...corners[i],
            }}
          />
        )
      })}

      {/* ── Floating stat badges ──────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          right: '-14px',
          top: '22%',
          zIndex: 10,
        }}
        className="hidden lg:block"
      >
        <div
          style={{
            background: 'rgba(8,11,20,0.88)',
            border: '1px solid rgba(79,195,247,0.18)',
            backdropFilter: 'blur(16px)',
            borderRadius: '12px',
            padding: '10px 14px',
            textAlign: 'center',
            minWidth: '72px',
          }}
        >
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#4FC3F7' }}>20+</p>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#7D8590' }}>Projects</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          left: '-14px',
          bottom: '28%',
          zIndex: 10,
        }}
        className="hidden lg:block"
      >
        <div
          style={{
            background: 'rgba(8,11,20,0.88)',
            border: '1px solid rgba(139,92,246,0.18)',
            backdropFilter: 'blur(16px)',
            borderRadius: '12px',
            padding: '10px 14px',
            textAlign: 'center',
            minWidth: '72px',
          }}
        >
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#8B5CF6' }}>6+</p>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: '#7D8590' }}>Years</p>
        </div>
      </motion.div>

      {/* Fiverr social proof badge */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          right: '-10px',
          bottom: '22%',
          zIndex: 10,
        }}
        className="hidden lg:block"
      >
        <div
          style={{
            background: 'rgba(8,11,20,0.88)',
            border: '1px solid rgba(79,195,247,0.15)',
            backdropFilter: 'blur(16px)',
            borderRadius: '12px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Star size={11} style={{ color: '#FFB800', fill: '#FFB800' }} />
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '11px', color: '#F0F6FC' }}>Fiverr Pro</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Hero section ───────────────────────────────────────────────────── */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(id)
  }, [])

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 22, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* 3D particle background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Atmospheric overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 20% -10%, rgba(79,195,247,0.10) 0%, transparent 65%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 70% at 85% 65%, rgba(139,92,246,0.06) 0%, transparent 65%)' }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080B14, transparent)' }}
      />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 section-container pt-24 pb-16">
        <div className="grid md:grid-cols-[1fr_340px] lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">

          {/* Left — text */}
          <div className="space-y-5 order-2 md:order-1">

            {/* Location + availability */}
            <motion.div {...fadeUp(0.15)} className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <MapPin size={11} className="text-sky/50" />
                <span className="font-mono text-xs text-ink-muted">{SITE_IDENTITY.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-flex w-1.5 h-1.5 rounded-full"
                  style={{ background: '#4FC3F7', boxShadow: '0 0 6px rgba(79,195,247,0.8)' }}
                />
                <span className="font-mono text-xs text-sky/60">Available for work</span>
              </div>
            </motion.div>

            {/* Name — two-line, cinematic */}
            <div className="space-y-0">
              <motion.h1
                {...fadeUp(0.25)}
                className="font-display font-bold leading-[0.9] tracking-tight text-ink-primary"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)' }}
              >
                Kusumeshkant
              </motion.h1>
              <motion.h1
                {...fadeUp(0.35)}
                className="font-display font-bold leading-[0.9] tracking-tight"
                style={{
                  fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                  background: 'linear-gradient(135deg, #4FC3F7 0%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Sharma.
              </motion.h1>
            </div>

            {/* Role rotator */}
            <div style={{ height: '28px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                  animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
                  exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-medium text-base md:text-lg whitespace-nowrap"
                  style={{ color: 'rgba(79,195,247,0.75)' }}
                >
                  {ROLES[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Tagline */}
            <motion.p
              {...fadeUp(0.52)}
              className="text-ink-muted text-base leading-relaxed max-w-md"
            >
              I architect scalable systems — fintech payments, healthcare platforms,
              AI agents. Flutter to cloud. Code that ships, systems that scale.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-3">
              <Button variant="primary" href="#projects">
                <Zap size={14} />
                View My Work
              </Button>
              <Button variant="outline" href="#contact">
                Let's Connect
                <ArrowRight size={14} />
              </Button>
              <a
                href="/Kusumeshkant_Sharma_Resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-display font-medium transition-all duration-300 text-ink-muted hover:text-sky"
                style={{ border: '1px solid rgba(100,180,255,0.1)', background: 'rgba(19,28,46,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,195,247,0.25)'; e.currentTarget.style.background = 'rgba(79,195,247,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(100,180,255,0.1)'; e.currentTarget.style.background = 'rgba(19,28,46,0.3)' }}
              >
                <Download size={13} />
                Resume
              </a>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              {...fadeUp(0.78)}
              className="flex items-center gap-5 pt-2"
              style={{ borderTop: '1px solid rgba(100,180,255,0.07)' }}
            >
              {[
                { value: '6+',  label: 'Years'      },
                { value: '20+', label: 'Projects'   },
                { value: '10+', label: 'Stack'      },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-display font-bold text-xl text-ink-primary">{value}</span>
                  <span className="font-mono text-[10px] text-ink-muted tracking-wider uppercase">{label}</span>
                </div>
              ))}

              {/* Divider */}
              <div className="w-px h-8 bg-glass-border mx-1" />

              {/* Trust signals */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} style={{ color: '#FFB800', fill: '#FFB800' }} />
                ))}
                <span className="font-mono text-[10px] text-ink-muted ml-1">Fiverr</span>
              </div>
            </motion.div>
          </div>

          {/* Right — photo */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            {/*
              Mobile: compact height so photo + text both fit on screen.
              On md+: full height portrait frame.
            */}
            <div className="w-64 md:w-full" style={{ maxWidth: '420px' }}>
              <HeroPhoto />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ color: '#7D8590' }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={13} />
        </motion.div>
      </motion.div>
    </section>
  )
}
