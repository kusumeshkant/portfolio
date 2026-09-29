/**
 * Contact Section — Kusumeshkant Sharma
 * ─────────────────────────────────────
 * Direct contact details only (no form): email, phone/WhatsApp, LinkedIn,
 * GitHub as a 2×2 grid of cards on desktop, a single column on mobile.
 */
import { m } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, Clock, ArrowUpRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { SOCIAL_LINKS, SITE_IDENTITY } from '@/data/navigation'

// external: true → opens in a new tab (never for mailto:/tel:)
const CONTACTS = [
  { href: SOCIAL_LINKS.email,    Icon: Mail,     label: 'Email',            value: SITE_IDENTITY.email },
  { href: SITE_IDENTITY.phoneTel, Icon: Phone,   label: 'Phone / WhatsApp', value: SITE_IDENTITY.phone },
  { href: SOCIAL_LINKS.linkedin, Icon: Linkedin, label: 'LinkedIn',         value: 'in/kusumeshkantsharma', external: true },
  { href: SOCIAL_LINKS.github,   Icon: Github,   label: 'GitHub',           value: 'github.com/kusumeshkant', external: true },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

function ContactCard({ href, Icon, label, value, external }) {
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className="glass-card-glow group flex items-center gap-4 p-5 min-w-0"
    >
      <div className="p-3 rounded-xl flex-shrink-0" style={{ background: 'rgba(79,195,247,0.10)' }}>
        <Icon size={18} className="text-sky" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-ink-primary font-display font-semibold">{label}</p>
        <p className="text-ink-muted text-sm font-mono [overflow-wrap:anywhere]">{value}</p>
      </div>
      <ArrowUpRight
        size={16}
        className="text-ink-muted group-hover:text-sky transition-colors flex-shrink-0"
        aria-hidden
      />
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-section relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px', height: '500px',
          left: '50%', top: '40%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,195,247,0.05), transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden
      />

      <div className="section-container">
        <SectionHeader
          label="06 / Contact"
          title={<>Let's build<br /><span className="gradient-text">something great.</span></>}
          subtitle={SITE_IDENTITY.available}
        />

        <m.ul {...fadeUp(0)} className="grid md:grid-cols-2 gap-4">
          {CONTACTS.map(contact => (
            <li key={contact.label} className="min-w-0">
              <ContactCard {...contact} />
            </li>
          ))}
        </m.ul>

        <m.p {...fadeUp(0.1)} className="mt-6 flex items-start gap-2.5 text-ink-muted text-sm">
          <Clock size={14} className="text-sky mt-0.5 flex-shrink-0" aria-hidden />
          Typically responds within 18–24 hours (available during IST hours)
        </m.p>
      </div>
    </section>
  )
}
