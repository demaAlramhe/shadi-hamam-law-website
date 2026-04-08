import { useState } from 'react'
import { Phone, Mail, MapPin, Camera, Globe, MessageCircle, Loader2, Printer } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import {
  siteConfig,
  getWhatsAppLink,
  getTelHref,
  getMapsEmbedSrc,
  getMapsExternalUrl,
} from '../config/siteConfig'
import { FORMSPREE_CONTACT_ENDPOINT } from '../config/formspreeConfig'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const inputBase =
  'mt-2 w-full rounded-xl border bg-charcoal-950/90 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:ring-2'

const inputNormal =
  `${inputBase} border-white/[0.1] focus:border-gold-500/45 focus:ring-gold-500/20`

const inputError = `${inputBase} border-red-400/35 focus:border-red-400/50 focus:ring-red-500/15`

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

function validateContact({ name, email, phone, message }, t) {
  const errors = {}
  const n = name.trim()
  const e = email.trim()
  const p = phone.trim()
  const m = message.trim()

  if (n.length < 2) errors.name = t.contact.formErrName
  if (!e || !emailOk(e)) errors.email = t.contact.formErrEmail
  if (p) {
    const digits = p.replace(/\D/g, '')
    if (digits.length < 8) errors.phone = t.contact.formErrPhone
  }
  if (m.length < 10) errors.message = t.contact.formErrMessage

  return errors
}

export function Contact() {
  const { t, locale } = useLanguage()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState(null) // 'success' | 'error' | 'config'

  const address = locale === 'he' ? siteConfig.addressHe : siteConfig.addressAr
  const mobileHref = getTelHref(siteConfig.mobilePhone)
  const office1 = getTelHref(siteConfig.officePhone1)
  const officeFax = `fax:${siteConfig.officePhone2.replace(/\D/g, '')}`
  const wa = getWhatsAppLink()

  const c = t.contact

  async function handleSubmit(e) {
    e.preventDefault()
    setFieldErrors({})
    setFormStatus(null)

    const errors = validateContact({ name, email, phone, message }, t)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    const endpoint = FORMSPREE_CONTACT_ENDPOINT?.trim()
    if (!endpoint) {
      setFormStatus('config')
      return
    }

    setSubmitting(true)

    const subject =
      locale === 'he'
        ? `פנייה מהאתר — ${name.trim()}`
        : `تواصل من الموقع — ${name.trim()}`

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          _subject: subject,
        }),
      })

      if (res.ok) {
        setFormStatus('success')
        setName('')
        setPhone('')
        setEmail('')
        setMessage('')
        return
      }

      setFormStatus('error')
    } catch {
      setFormStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const disabled = submitting || formStatus === 'success'
  const inputClass = (key) => (fieldErrors[key] ? inputError : inputNormal)

  return (
    <section id="contact" className="section-y border-b border-white/[0.06] bg-charcoal-950">
      <div className="container-page">
        <Reveal>
          <SectionHeading subtitle={t.contact.subtitle}>{t.contact.title}</SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-5">
              <div className="glass-panel-elevated rounded-2xl p-6 md:rounded-3xl md:p-7">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500/90">
                  {t.contact.mobile}
                </h3>
                <a
                  href={mobileHref}
                  className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-white transition hover:text-gold-200"
                >
                  <Phone className="h-4 w-4 text-gold-500/85" aria-hidden />
                  {siteConfig.mobilePhone}
                </a>
              </div>

              <div className="glass-panel-elevated rounded-2xl p-6 md:rounded-3xl md:p-7">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500/90">
                  {t.contact.officePhones}
                </h3>
                <div className="mt-4 flex flex-col gap-2.5">
                  <a
                    href={office1}
                    className="inline-flex items-center gap-2 text-white transition hover:text-gold-200"
                  >
                    <Phone className="h-4 w-4 text-gold-500/85" aria-hidden />
                    <span className="text-zinc-400">{c.officePhoneLabel}:</span>
                    {siteConfig.officePhone1}
                  </a>
                  <a
                    href={officeFax}
                    className="inline-flex items-center gap-2 text-white transition hover:text-gold-200"
                  >
                    <Printer className="h-4 w-4 text-gold-500/85" aria-hidden />
                    <span className="text-zinc-400">{c.faxLabel}:</span>
                    {siteConfig.officePhone2}
                  </a>
                </div>
              </div>

              <div className="glass-panel-elevated rounded-2xl p-6 md:rounded-3xl md:p-7">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500/90">
                  {t.contact.email}
                </h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-white transition hover:text-gold-200"
                >
                  <Mail className="h-4 w-4 text-gold-500/85" aria-hidden />
                  {siteConfig.email}
                </a>
              </div>

              <div className="glass-panel-elevated rounded-2xl p-6 md:rounded-3xl md:p-7">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500/90">
                  {t.contact.social}
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300 transition hover:border-gold-500/35 hover:bg-white/[0.06] hover:text-white"
                  >
                    <Camera className="h-4 w-4" aria-hidden />
                    Instagram
                  </a>
                  <a
                    href={siteConfig.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300 transition hover:border-gold-500/35 hover:bg-white/[0.06] hover:text-white"
                  >
                    <Globe className="h-4 w-4" aria-hidden />
                    Facebook
                  </a>
                </div>
              </div>

              <div className="glass-panel-elevated rounded-2xl p-6 md:rounded-3xl md:p-7">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500/90">
                  {t.contact.address}
                </h3>
                <a
                  href={getMapsExternalUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-start gap-2 rounded-lg text-zinc-300 transition hover:text-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/50"
                  aria-label={`${t.contact.mapOpen}: ${address}`}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/85" aria-hidden />
                  <span className="underline-offset-4 hover:underline">{address}</span>
                </a>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 sm:flex-initial">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t.contact.ctaWhatsApp}
                </a>
                <a href={mobileHref} className="btn-outline flex-1 sm:flex-initial">
                  <Phone className="h-4 w-4" aria-hidden />
                  {t.contact.ctaCall}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="btn-outline flex-1 sm:flex-initial">
                  <Mail className="h-4 w-4" aria-hidden />
                  {t.contact.ctaEmail}
                </a>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal delayMs={80}>
              <div className="overflow-hidden rounded-2xl border border-gold-500/20 bg-charcoal-900/70 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.7)] md:rounded-3xl">
                <div className="flex items-center justify-between border-b border-gold-500/20 bg-charcoal-950/55 px-5 py-4">
                  <span className="text-sm font-medium text-zinc-100">{t.contact.mapTitle}</span>
                  <a
                    href={getMapsExternalUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-gold-400 transition hover:text-gold-300"
                  >
                    {t.contact.mapOpen}
                  </a>
                </div>
                <div className="aspect-[16/11] w-full bg-zinc-900">
                  <iframe
                    title={t.contact.mapTitle}
                    src={getMapsEmbedSrc()}
                    className="h-full w-full border-0 grayscale contrast-[1.05]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <form
                onSubmit={handleSubmit}
                className="glass-panel-elevated rounded-2xl p-6 md:rounded-3xl md:p-8 lg:p-9"
                noValidate
              >
                <div className="grid gap-5">
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-400">{c.formName}</span>
                    <input
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }))
                      }}
                      className={inputClass('name')}
                      autoComplete="name"
                      disabled={disabled}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? 'err-name' : undefined}
                    />
                    {fieldErrors.name && (
                      <p id="err-name" className="mt-1.5 text-xs text-red-300/90" role="alert">
                        {fieldErrors.name}
                      </p>
                    )}
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-400">{c.formPhone}</span>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }))
                      }}
                      className={inputClass('phone')}
                      autoComplete="tel"
                      disabled={disabled}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
                    />
                    {fieldErrors.phone && (
                      <p id="err-phone" className="mt-1.5 text-xs text-red-300/90" role="alert">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-400">{c.formEmail}</span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }))
                      }}
                      className={inputClass('email')}
                      autoComplete="email"
                      disabled={disabled}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                    />
                    {fieldErrors.email && (
                      <p id="err-email" className="mt-1.5 text-xs text-red-300/90" role="alert">
                        {fieldErrors.email}
                      </p>
                    )}
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-400">{c.formMessage}</span>
                    <textarea
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value)
                        if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }))
                      }}
                      className={`${inputClass('message')} resize-y min-h-[7.5rem]`}
                      disabled={disabled}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? 'err-message' : undefined}
                    />
                    {fieldErrors.message && (
                      <p id="err-message" className="mt-1.5 text-xs text-red-300/90" role="alert">
                        {fieldErrors.message}
                      </p>
                    )}
                  </label>
                </div>

                {formStatus === 'success' && (
                  <div
                    className="mt-6 rounded-xl border border-emerald-500/25 bg-emerald-950/35 px-4 py-3 text-center text-sm leading-relaxed text-emerald-100/95"
                    role="status"
                    aria-live="polite"
                  >
                    {c.formSuccess}
                  </div>
                )}

                {(formStatus === 'error' || formStatus === 'config') && (
                  <div
                    className="mt-6 rounded-xl border border-red-400/25 bg-red-950/30 px-4 py-3 text-center text-sm leading-relaxed text-red-100/90"
                    role="alert"
                    aria-live="assertive"
                  >
                    {formStatus === 'config' ? c.formErrorConfig : c.formError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || formStatus === 'success'}
                  aria-busy={submitting}
                  className="btn-primary mt-8 flex w-full min-h-[48px] items-center justify-center gap-2 py-4 disabled:pointer-events-none disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                      <span>{c.formSending}</span>
                    </>
                  ) : (
                    c.formSubmit
                  )}
                </button>

                {formStatus === 'success' && (
                  <button
                    type="button"
                    onClick={() => setFormStatus(null)}
                    className="btn-outline mt-3 w-full border-white/[0.14] py-3 text-sm text-zinc-200"
                  >
                    {c.formSendAnother}
                  </button>
                )}

                <p className="mt-4 text-center text-xs leading-relaxed text-zinc-500">{c.formNote}</p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
