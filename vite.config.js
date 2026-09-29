import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // @ alias maps to ./src — so you write import X from '@/components/X' anywhere
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // No manualChunks: Rollup's default splitting keeps Three.js (lazy 3D scenes)
    // and Framer Motion's animation features (LazyMotion, see main.jsx) out of
    // the initial load. A static vendor map pulled both into the critical path.
    // Increase chunk warning threshold (Three.js is large)
    chunkSizeWarningLimit: 1000,
  },
  // Optimise Three.js deps on first load
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
