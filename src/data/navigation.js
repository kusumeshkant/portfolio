/**
 * Site identity and navigation data
 * ──────────────────────────────────
 * Single source of truth for all personal branding.
 * Update your social handles here before deploying.
 */

export const SITE_IDENTITY = {
  fullName:  'Kusumeshkant Sharma',
  firstName: 'Kusumeshkant',
  lastName:  'Sharma',
  initials:  'KS',
  title:     'Senior Flutter Developer',
  subtitle:  'AI Agent Architect',
  tagline:   'Senior Flutter Developer · AI Agent Architect',
  yearsExperience: 4,                     // development roles only (Feb 2022 →), excludes Concentrix
  email:     'kusumeshkantsharma@gmail.com',
  phone:     '+91 8884133322',
  phoneTel:  'tel:+918884133322',        // used for click-to-call <a href>
  location:  'Bangalore · Open to Remote',
  available: 'Open to freelance & full-time opportunities',
  resume:    '/Kusumesh_Resume.pdf',
}

export const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'      },
  { label: 'Experience', href: '#experience'  },
  { label: 'Projects',   href: '#projects'    },
  { label: 'Contact',    href: '#contact'     },
]

export const SOCIAL_LINKS = {
  github:   'https://github.com/kusumeshkant',
  linkedin: 'https://www.linkedin.com/in/kusumeshkantsharma/',
  email:    'mailto:kusumeshkantsharma@gmail.com',
  phone:    'tel:+918884133322',
}
