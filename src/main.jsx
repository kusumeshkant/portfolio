/**
 * main.jsx — Application entry point
 *
 * React 18's createRoot API is used here (not the legacy render).
 * MotionConfig reducedMotion="user" makes every Framer Motion animation
 * respect the OS "reduce motion" setting (transforms are skipped, opacity kept).
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
