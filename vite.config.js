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
    rollupOptions: {
      output: {
        // Only framer-motion gets its own long-cached chunk. Three.js is left to
        // Rollup: it's reachable only through lazy 3D components, so it stays out
        // of the initial load. (A static manualChunks map for three/react pulled
        // React into the Three.js chunk and forced a 963 kB modulepreload.)
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'motion-vendor'
        },
      },
    },
    // Increase chunk warning threshold (Three.js is large)
    chunkSizeWarningLimit: 1000,
  },
  // Optimise Three.js deps on first load
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
