import { Phone, MessageCircle, Send, ShieldCheck, Scale, Clock, Sparkles } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { siteConfig, getWhatsAppLink, getTelHref } from '../config/siteConfig'
import { Reveal } from './Reveal'

const badgeIcons = [ShieldCheck, Scale, Clock, Sparkles]

export function Hero() {
  const { t, locale } = useLanguage()
  const wa = getWhatsAppLink()
  const tel = getTelHref(siteConfig.mobilePhone)

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const headline =
    locale === 'he' ? siteConfig.officeNameHe : siteConfig.officeNameAr

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-white/[0.06] bg-charcoal-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(201,169,98,0.14),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(10,10,11,0.4),transparent_55%)]" />
      <div className="hero-ambient pointer-events-none absolute -start-40 top-0 h-[min(100vw,28rem)] w-[min(100vw,28rem)] rounded-full bg-gold-500/[0.07] blur-3xl" />
      <div className="hero-ambient pointer-events-none absolute -end-32 bottom-0 h-80 w-80 rounded-full bg-gold-600/[0.05] blur-3xl [animation-delay:-4s]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto flex min-h-[min(100svh,56rem)] max-w-6xl flex-col justify-center gap-12 px-5 py-20 sm:px-6 lg:min-h-[min(92svh,880px)] lg:gap-16 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <Reveal>
              <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold-500/80">
                {locale === 'he' ? 'ליווי משפטי' : 'مرافقة قانونية'}
              </p>
              <h1
                className={`max-w-xl text-[clamp(1.85rem,4.2vw+0.5rem,3.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white ${
                  locale === 'ar' ? 'font-sans' : 'font-display'
                }`}
              >
                <span className="text-gradient-gold">{headline}</span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-zinc-400/95 sm:text-lg md:mt-8 md:text-xl md:leading-relaxed">
                {t.hero.subheadline}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-10">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary sm:flex-initial"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                  {t.hero.ctaWhatsApp}
                </a>
                <a href={tel} className="btn-outline sm:flex-initial">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  {t.hero.ctaCall}
                </a>
                <button type="button" onClick={scrollToContact} className="btn-outline w-full sm:w-auto">
                  <Send className="h-4 w-4 shrink-0" aria-hidden />
                  {t.hero.ctaForm}
                </button>
              </div>

              <ul
                className="mt-12 flex flex-wrap gap-2.5 md:mt-14 md:gap-3"
                aria-label="Trust highlights"
              >
                {t.hero.trust.map((label, i) => {
                  const Icon = badgeIcons[i % badgeIcons.length]
                  return (
                    <li key={label}>
                      <span className="glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-zinc-300/95 transition duration-300 hover:border-gold-500/25 hover:bg-white/[0.04] md:text-sm">
                        <Icon
                          className="h-3.5 w-3.5 shrink-0 text-gold-500/85"
                          aria-hidden
                        />
                        {label}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal delayMs={100}>
              <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
                <div className="hero-image-ring pointer-events-none absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-gold-400/25 via-gold-600/10 to-transparent opacity-70 blur-2xl" />
                <div className="hero-image-ring pointer-events-none absolute -inset-[2px] rounded-[1.85rem] bg-gradient-to-tr from-white/[0.08] via-transparent to-gold-500/10" />
                <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-charcoal-900/40 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.06]">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-950 via-charcoal-950/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-charcoal-950/90 to-transparent" />
                  <img
                    src={siteConfig.lawyerImageUrl}
                    alt={locale === 'he' ? siteConfig.lawyerNameHe : siteConfig.lawyerNameAr}
                    className="aspect-[4/5] w-full scale-[1.01] object-cover object-top transition duration-700 ease-out group-hover:scale-105 md:aspect-[3/4]"
                    width={600}
                    height={750}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
