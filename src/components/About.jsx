import { useLanguage } from '../hooks/useLanguage'
import { siteConfig } from '../config/siteConfig'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function About() {
  const { t, locale } = useLanguage()

  return (
    <section
      id="about"
      className="section-y border-b border-white/[0.06] bg-gradient-to-b from-charcoal-900/60 to-charcoal-950/80"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading>{t.about.title}</SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-2 md:items-stretch md:gap-16 lg:gap-20">
          <Reveal className="order-2 md:order-1" delayMs={60}>
            <div className="glass-panel-elevated flex h-full flex-col justify-center rounded-2xl p-8 md:rounded-3xl md:p-10 lg:p-12">
              <p className="text-lg leading-[1.75] text-zinc-400/95 md:text-xl md:leading-relaxed">
                {t.about.body}
              </p>
            </div>
          </Reveal>
          <Reveal className="order-1 md:order-2" delayMs={120}>
            <div className="group relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/[0.1] shadow-[0_28px_80px_-32px_rgba(0,0,0,0.75)] md:min-h-[320px] md:rounded-3xl">
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-gold-500/15 via-transparent to-transparent opacity-80 transition duration-700 group-hover:opacity-100" />
              <img
                src={siteConfig.lawyerImageUrl}
                alt={locale === 'he' ? siteConfig.lawyerNameHe : siteConfig.lawyerNameAr}
                className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
                width={800}
                height={600}
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
