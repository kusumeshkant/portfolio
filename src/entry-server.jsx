/**
 * entry-server.jsx — build-time prerender entry
 *
 * scripts/prerender.mjs renders the whole app to static HTML and writes it
 * into dist/index.html, so every section paints before JavaScript runs and is
 * readable by crawlers. renderToPipeableStream + onAllReady waits for the
 * React.lazy sections (renderToString can't, and would leave client-only
 * boundaries that log React error #419 during hydration).
 */
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import App from './App.jsx'

export function render() {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _encoding, done) { html += chunk; done() },
      final(done) { resolve(html); done() },
    })

    const { pipe } = renderToPipeableStream(
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LazyMotion>,
      {
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: reject,
      },
    )
  })
}
