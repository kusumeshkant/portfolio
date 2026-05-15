/**
 * useMousePosition
 * Tracks the mouse position and returns { x, y } relative to the viewport.
 * Used by the custom cursor and the 3D parallax scenes.
 */
import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return position
}
