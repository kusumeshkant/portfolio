/**
 * useMediaQuery
 * Returns whether a CSS media query currently matches, and updates on change.
 *
 * useRich3D() is the gate for every Three.js scene: large screen, a real
 * mouse, and no "reduce motion" preference. Phones and tablets never
 * download the Three.js bundle at all.
 */
import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  // Starts false so the prerendered HTML and the first client render agree;
  // the effect below applies the real value right after hydration.
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function useRich3D() {
  return useMediaQuery(
    '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  )
}
