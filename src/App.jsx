/**
 * App.jsx — Root component
 *
 * Responsibilities:
 *  1. Renders the global layout shell (Navbar, sections, Footer)
 *  2. Handles section lazy loading via React.lazy + Suspense
 *
 * SEO tags (title, description, OG) live statically in index.html so that
 * crawlers and link unfurlers see them without running JavaScript.
 *
 * Architecture pattern:
 *  Each section is lazy-loaded so the initial JS bundle stays small.
 *  The Hero section is loaded eagerly (it's above the fold and must paint fast).
 *  All other sections are loaded when React is idle after first paint.
 */
import { lazy, Suspense } from 'react'

// Layout
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Sections — Hero is eager (above the fold), rest are lazy
import Hero from '@/components/sections/Hero'

const About        = lazy(() => import('@/components/sections/About'))
const Skills       = lazy(() => import('@/components/sections/Skills'))
const Experience   = lazy(() => import('@/components/sections/Experience'))
const Projects     = lazy(() => import('@/components/sections/Projects'))
const Interactive3D= lazy(() => import('@/components/sections/Interactive3D'))
const Contact      = lazy(() => import('@/components/sections/Contact'))

/* Minimal placeholder shown while a lazy section loads */
function SectionFallback() {
  return (
    <div className="py-section flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-sky/30 border-t-sky animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/*
       * Atmospheric background orbs
       * These are large, blurred colour blobs positioned absolutely.
       * They sit behind all content and give cinematic depth to the page.
       * pointer-events: none so they never interfere with interaction.
       */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Top-right primary orb */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #4FC3F7, transparent 70%)' }}
        />
        {/* Bottom-left secondary orb */}
        <div
          className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }}
        />
        {/* Mid-page right orb */}
        <div
          className="absolute top-[45%] -right-60 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #4FC3F7, transparent 70%)' }}
        />
      </div>

      {/* Main content */}
      <main>
        {/* Hero — loaded immediately */}
        <Hero />

        {/* Remaining sections — lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Interactive3D />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
