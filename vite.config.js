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
    // Split large vendors into separate chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'motion-vendor': ['framer-motion'],
          // 'gsap-vendor': ['gsap'],  // uncomment when GSAP is used in components
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
