/**
 * Footer — Kusumeshkant Sharma
 * Clean, minimal. Three columns: brand · nav · connect.
 */
import { Github, Linkedin, Mail, ExternalLink, Phone } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS, SITE_IDENTITY } from '@/data/navigation'

const SOCIALS = [
  { href: SOCIAL_LINKS.github,   Icon: Github,       label: 'GitHub'   },
  { href: SOCIAL_LINKS.linkedin, Icon: Linkedin,      label: 'LinkedIn' },
  { href: SOCIAL_LINKS.fiverr,   Icon: ExternalLink,  label: 'Fiverr'   },
  { href: SOCIAL_LINKS.email,    Icon: Mail,          label: 'Email'    },
  { href: SOCIAL_LINKS.phone,    Icon: Phone,         label: SITE_IDENTITY.phone },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t mt-0 py-14" style={{ borderColor: 'rgba(100,180,255,0.07)' }}>
      {/* Top edge glow */}
      <div className="absolute top-0 inset-x-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.2), transparent)'
      }} />

      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,195,247,0.15), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(79,195,247,0.2)',
                }}
              >
                <span className="gradient-text">{SITE_IDENTITY.initials}</span>
              </div>
              <span className="font-display font-semibold text-ink-primary">{SITE_IDENTITY.firstName}</span>
            </div>
            <p className="text-ink-muted text-sm leading-relaxed">
              Building scalable, production-grade systems across fintech, healthcare, and AI.
            </p>
            <p className="text-ink-faint text-xs font-mono mt-3">{SITE_IDENTITY.location}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-ink-primary font-display font-semibold text-xs mb-4 tracking-widest uppercase">
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-ink-muted text-sm hover:text-sky transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-ink-primary font-display font-semibold text-xs mb-4 tracking-widest uppercase">
              Connect
            </p>
            <ul className="space-y-2">
              {SOCIALS.map(({ href, Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-ink-muted text-sm hover:text-sky transition-colors duration-200"
                  >
                    <Icon size={13} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-7 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(100,180,255,0.07)' }}
        >
          <p className="text-ink-faint text-xs font-mono">
            © {year} {SITE_IDENTITY.fullName} · All rights reserved
          </p>
          <p className="text-ink-faint text-xs font-mono">
            Built with React · Three.js · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
