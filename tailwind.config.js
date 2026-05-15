/** @type {import('tailwindcss').Config} */
export default {
  // Only include Tailwind classes that are actually used — keeps CSS tiny
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // --- Colour system ---------------------------------------------------
      colors: {
        bg: {
          DEFAULT: '#080B14',   // deep space black-blue
          surface: '#0D1117',   // slightly lighter surface
          raised: '#131C2E',    // elevated cards
        },
        sky: {
          DEFAULT: '#4FC3F7',   // cool sky-blue — our primary
          dim: 'rgba(79,195,247,0.15)',
          glow: 'rgba(79,195,247,0.08)',
        },
        violet: {
          DEFAULT: '#8B5CF6',   // muted violet accent
          dim: 'rgba(139,92,246,0.15)',
          glow: 'rgba(139,92,246,0.08)',
        },
        ink: {
          primary: '#F0F6FC',
          secondary: '#C9D1D9',
          muted: '#7D8590',
          faint: '#3D444D',
        },
        glass: {
          DEFAULT: 'rgba(13,17,23,0.7)',
          border: 'rgba(100,180,255,0.07)',
          'border-glow': 'rgba(79,195,247,0.25)',
        },
      },
      // --- Typography ------------------------------------------------------
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      // --- Spacing additions -----------------------------------------------
      spacing: {
        section: '7rem',
        'section-sm': '4rem',
      },
      // --- Custom animations -----------------------------------------------
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
      // --- Background utilities --------------------------------------------
      backgroundImage: {
        'hero-radial':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,195,247,0.08) 0%, transparent 70%)',
        'section-gradient':
          'linear-gradient(180deg, transparent 0%, rgba(8,11,20,0.8) 100%)',
        'glass-shimmer':
          'linear-gradient(105deg, transparent 40%, rgba(79,195,247,0.06) 50%, transparent 60%)',
        'card-border':
          'linear-gradient(135deg, rgba(79,195,247,0.2), rgba(139,92,246,0.1), transparent)',
      },
      // --- Box shadows ------------------------------------------------------
      boxShadow: {
        'glow-sky': '0 0 30px rgba(79,195,247,0.12), 0 0 60px rgba(79,195,247,0.06)',
        'glow-violet': '0 0 30px rgba(139,92,246,0.12), 0 0 60px rgba(139,92,246,0.06)',
        'card': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,195,247,0.15)',
      },
      // --- Backdrop blur ---------------------------------------------------
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
