/**
 * AnimatedText
 * Splits text into words/letters and staggers them into view.
 *
 * mode="words"   → each word is a separate motion element
 * mode="chars"   → each character is a separate motion element (slower, cinematic)
 *
 * Usage:
 *  <AnimatedText mode="chars" className="text-7xl font-display font-bold">D.Q.</AnimatedText>
 */
import { motion } from 'framer-motion'

const WORD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const CHAR_VARIANTS = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function AnimatedText({ children, mode = 'words', className = '', delay = 0 }) {
  if (mode === 'chars') {
    const chars = String(children).split('')
    return (
      <span className={`inline-block ${className}`} aria-label={children}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            custom={i + delay / 0.05}
            variants={CHAR_VARIANTS}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </span>
    )
  }

  // Word mode
  const words = String(children).split(' ')
  return (
    <span className={`inline ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i + delay / 0.07}
          variants={WORD_VARIANTS}
          initial="hidden"
          animate="visible"
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
