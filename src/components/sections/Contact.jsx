/**
 * Contact Section — Kusumeshkant Sharma
 * ─────────────────────────────────────
 * Left:  Availability info + social links + phone + email
 * Right: Contact form (react-hook-form → opens the visitor's email app via mailto:)
 *
 * The form does not send anything itself. Options for real delivery
 * (Formspree / EmailJS) are listed in SITE_REVIEW.md.
 */
import { useState } from 'react'
import { m } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Github, Linkedin, Mail, Send, Phone, Clock, Globe } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import { SOCIAL_LINKS, SITE_IDENTITY } from '@/data/navigation'

const SOCIALS = [
  { href: SOCIAL_LINKS.github,   Icon: Github,   label: 'GitHub'   },
  { href: SOCIAL_LINKS.linkedin, Icon: Linkedin, label: 'LinkedIn' },
]

const AVAILABILITY_POINTS = [
  { Icon: Clock, text: 'Typically responds within 18–24 hours (available during IST hours)' },
  { Icon: Globe, text: 'Based in Bangalore · open to remote roles worldwide' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

const inputClass =
  'w-full bg-bg-raised border border-glass-border rounded-xl px-4 py-3 text-ink-secondary text-sm outline-none transition-all duration-200 focus-visible:border-sky/60 focus-visible:ring-2 focus-visible:ring-sky/40 placeholder:text-ink-faint font-body'

function Field({ id, label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block font-mono text-xs text-ink-muted uppercase tracking-wider">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-red-400 text-xs font-mono">{error.message}</p>}
    </div>
  )
}

/* aria wiring shared by every input */
const a11y = (id, error) => ({ id, 'aria-invalid': !!error, 'aria-describedby': error ? `${id}-error` : undefined })

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    // Opens the visitor's email app with a pre-filled message.
    const subject = encodeURIComponent(`Portfolio Inquiry: ${data.subject}`)
    const body    = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)
    window.location.href = `mailto:${SITE_IDENTITY.email}?subject=${subject}&body=${body}`
    setSubmitted(true)   // we can't know whether the mail app opened — the UI says so
  }

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

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ── Left: Availability + Socials ────────────────────── */}
          <div className="space-y-8">

            {/* Availability points */}
            <m.div {...fadeUp(0)} className="space-y-3">
              {AVAILABILITY_POINTS.map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={14} className="text-sky mt-0.5 flex-shrink-0" aria-hidden />
                  <p className="text-ink-muted text-sm">{text}</p>
                </div>
              ))}
            </m.div>

            {/* Direct contact cards */}
            <m.div {...fadeUp(0.08)} className="grid grid-cols-1 gap-2">
              {/* Email */}
              <a
                href={SOCIAL_LINKS.email}
                className="flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 group"
                style={{ borderColor: 'rgba(100,180,255,0.07)', background: 'rgba(19,28,46,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,195,247,0.2)'; e.currentTarget.style.background = 'rgba(79,195,247,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(100,180,255,0.07)'; e.currentTarget.style.background = 'rgba(19,28,46,0.3)' }}
              >
                <div className="p-2 rounded-lg" style={{ background: 'rgba(79,195,247,0.10)' }}>
                  <Mail size={13} className="text-sky" aria-hidden />
                </div>
                <div>
                  <p className="text-ink-primary text-sm font-display font-medium">Email</p>
                  <p className="text-ink-muted text-xs font-mono">{SITE_IDENTITY.email}</p>
                </div>
              </a>

              {/* Phone — click to call */}
              <a
                href={SITE_IDENTITY.phoneTel}
                className="flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 group"
                style={{ borderColor: 'rgba(100,180,255,0.07)', background: 'rgba(19,28,46,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,195,247,0.2)'; e.currentTarget.style.background = 'rgba(79,195,247,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(100,180,255,0.07)'; e.currentTarget.style.background = 'rgba(19,28,46,0.3)' }}
              >
                <div className="p-2 rounded-lg" style={{ background: 'rgba(79,195,247,0.10)' }}>
                  <Phone size={13} className="text-sky" aria-hidden />
                </div>
                <div>
                  <p className="text-ink-primary text-sm font-display font-medium">Phone / WhatsApp</p>
                  <p className="text-ink-muted text-xs font-mono">{SITE_IDENTITY.phone}</p>
                </div>
              </a>
            </m.div>

            {/* Social links */}
            <m.div {...fadeUp(0.16)}>
              <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-3">Find me on</p>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-display font-medium transition-all duration-300 text-ink-muted hover:text-sky"
                    style={{ border: '1px solid rgba(100,180,255,0.07)', background: 'rgba(19,28,46,0.3)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,195,247,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(100,180,255,0.07)'}
                  >
                    <Icon size={12} aria-hidden />
                    {label}
                  </a>
                ))}
              </div>
            </m.div>
          </div>

          {/* ── Right: Form ──────────────────────────────────────── */}
          <m.div {...fadeUp(0.12)}>
            <GlassCard glow className="p-7">
              {submitted ? (
                <div className="py-10 flex flex-col items-center text-center gap-4" role="status">
                  <Mail size={36} className="text-sky" aria-hidden />
                  <h3 className="font-display font-semibold text-ink-primary text-xl">
                    Opening your email app…
                  </h3>
                  <p className="text-ink-muted text-sm max-w-sm">
                    Your message is pre-filled — press send in your email app to deliver it.
                    If nothing opened, email me directly at{' '}
                    <a href={SOCIAL_LINKS.email} className="text-sky hover:underline">{SITE_IDENTITY.email}</a>.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-1">
                    Back to the form
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="contact-name" label="Your Name" error={errors.name}>
                      <input
                        {...a11y('contact-name', errors.name)}
                        autoComplete="name"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="John Smith"
                        className={inputClass}
                      />
                    </Field>
                    <Field id="contact-email" label="Your Email" error={errors.email}>
                      <input
                        {...a11y('contact-email', errors.email)}
                        autoComplete="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                        })}
                        placeholder="john@company.com"
                        className={inputClass}
                        type="email"
                      />
                    </Field>
                  </div>

                  <Field id="contact-subject" label="Subject" error={errors.subject}>
                    <input
                      {...a11y('contact-subject', errors.subject)}
                      {...register('subject', { required: 'Subject is required' })}
                      placeholder="Senior Flutter role / Flutter app / AI agents / Collaboration"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="contact-message" label="Message" error={errors.message}>
                    <textarea
                      {...a11y('contact-message', errors.message)}
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 20, message: 'Please share a bit more detail (20+ chars)' },
                      })}
                      placeholder={`Hi Kusumeshkant, I'd like to discuss building a…`}
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                  >
                    <Send size={14} aria-hidden />
                    {isSubmitting ? 'Opening…' : 'Open in email app'}
                  </Button>

                  <p className="text-center text-ink-muted text-xs">
                    Opens your email app with the message pre-filled.
                  </p>
                </form>
              )}
            </GlassCard>
          </m.div>

        </div>
      </div>
    </section>
  )
}
