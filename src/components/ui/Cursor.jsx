/**
 * Cursor
 * Custom cursor that replaces the browser default on desktop.
 * - Small filled dot that follows the mouse precisely (no lag)
 * - Larger ring that follows with a spring lag (feels alive)
 * - Both scale up when hovering over interactive elements
 * Hidden on mobile via CSS (cursor: auto on body at ≤768px)
 */
import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  // Precise mouse coordinates (updated on every mousemove)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring-smoothed coordinates for the ring (gives the trailing effect)
  const springConfig = { damping: 28, stiffness: 300 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // Scale the ring up on hover over interactive targets
    const grow = () => document.documentElement.classList.add('cursor-grow')
    const shrink = () => document.documentElement.classList.remove('cursor-grow')

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor-grow]').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Outer ring — spring-lagged */}
      <motion.div
        className="cursor-ring fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(79, 195, 247, 0.45)',
          mixBlendMode: 'normal',
        }}
      />

      {/* Inner dot — precise, no lag */}
      <motion.div
        className="cursor-dot fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'rgba(79, 195, 247, 0.9)',
          boxShadow: '0 0 8px rgba(79, 195, 247, 0.6)',
        }}
      />
    </>
  )
}
