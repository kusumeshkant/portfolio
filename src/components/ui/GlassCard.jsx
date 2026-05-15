/**
 * GlassCard
 * The universal card component for the portfolio.
 * Wraps children in a glass-morphism surface.
 *
 * Props:
 *  glow   – true adds hover glow border effect
 *  tilt   – true enables 3D mouse-tilt on hover (desktop only)
 *  className – additional Tailwind classes
 */
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/utils/cn'

export default function GlassCard({ children, glow = false, tilt = false, className }) {
  const cardRef = useRef(null)

  // Mouse position relative to card center (0–1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth the values so the tilt feels weighted
  const springX = useSpring(x, { stiffness: 200, damping: 30 })
  const springY = useSpring(y, { stiffness: 200, damping: 30 })

  // Map to rotation degrees (max ±8°)
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e) => {
    if (!tilt) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(glow ? 'glass-card-glow' : 'glass-card', className)}
      style={tilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
