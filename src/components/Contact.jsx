import { useState } from 'react'
import { Phone, Mail, MapPin, Camera, Globe, MessageCircle } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import {
  siteConfig,
  getWhatsAppLink,
  getTelHref,
  getMapsEmbedSrc,
  getMapsExternalUrl,
} from '../config/siteConfig'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const inputClass =
  'mt-2 w-full rounded-xl border border-white/[0.1] bg-charcoal-950/90 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-gold-500/45 focus:ring-2 focus:ring-gold-500/20'

export function Contact() {
  const { t, locale } = useLanguage()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const address = locale === 'he' ? siteConfig.addressHe : siteConfig.addressAr
  const mobileHref = getTelHref(siteConfig.mobilePhone)
  const office1 = getTelHref(siteConfig.officePhone1)
  const office2 = getTelHref(siteConfig.officePhone2)
  const wa = getWhatsAppLink()

  const submitMailto = (e) => {
    e.preventDefault()
    const subject =
      locale === 'he'
        ? `פנייה מהאתר — ${name || 'לקוח'}`
        : `تواصل من الموقع — ${name || 'عميل'}`
    const body = [
      `${t.contact.formName}: ${name}`,
      `${t.contact.formPhone}: ${phone}`,
      `${t.contact.formEmail}: ${email}`,
      '',
      message,
    ].join('\n')
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

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
                    {siteConfig.officePhone1}
                  </a>
                  <a
                    href={office2}
                    className="inline-flex items-center gap-2 text-white transition hover:text-gold-200"
                  >
                    <Phone className="h-4 w-4 text-gold-500/85" aria-hidden />
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
                <a href={`mailto:${siteConfig.email}`} className="btn-ghost flex-1 sm:flex-initial">
                  <Mail className="h-4 w-4" aria-hidden />
                  {t.contact.ctaEmail}
                </a>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal delayMs={80}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-black/50 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.85)] md:rounded-3xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                  <span className="text-sm font-medium text-zinc-300">{t.contact.mapTitle}</span>
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
                onSubmit={submitMailto}
                className="glass-panel-elevated rounded-2xl p-6 md:rounded-3xl md:p-8 lg:p-9"
              >
                <div className="grid gap-5">
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-400">{t.contact.formName}</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      autoComplete="name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-400">{t.contact.formPhone}</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-400">{t.contact.formEmail}</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      autoComplete="email"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-400">{t.contact.formMessage}</span>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputClass} resize-y`}
                    />
                  </label>
                </div>
                <button type="submit" className="btn-primary mt-8 w-full py-4">
                  {t.contact.formSubmit}
                </button>
                <p className="mt-4 text-center text-xs leading-relaxed text-zinc-500">
                  {t.contact.formNote}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
