/**
 * main.jsx — Application entry point
 *
 * React 18's createRoot API is used here (not the legacy render).
 * HelmetProvider wraps everything to enable per-component SEO tags.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
