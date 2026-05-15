/**
 * useCountUp
 * Animates a number from 0 to `target` when `active` becomes true.
 * Used for the About section stats to create a premium count-up effect.
 *
 * @param {number} target  - The final value to count up to
 * @param {boolean} active - Trigger to start the animation (usually from useInView)
 * @param {number} duration - Animation duration in ms (default 1500)
 */
import { useState, useEffect, useRef } from 'react'

export function useCountUp(target, active, duration = 1500) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current || typeof target !== 'number') return
    started.current = true

    const startTime = performance.now()
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])

  return count
}
