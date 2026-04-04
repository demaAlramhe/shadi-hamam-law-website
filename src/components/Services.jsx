import { Gavel, Car, Shield, LineChart } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const icons = [Gavel, Car, Shield, LineChart]

export function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="section-y border-b border-white/[0.06] bg-charcoal-950">
      <div className="container-page">
        <Reveal>
          <SectionHeading>{t.services.title}</SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {t.services.items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={item.title} delayMs={i * 70}>
                <article className="glass-panel card-interactive group flex h-full flex-col rounded-2xl p-6 md:rounded-3xl md:p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/[0.09] text-gold-400 ring-1 ring-gold-500/25 transition duration-500 group-hover:bg-gold-500/15 group-hover:ring-gold-500/35">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400/95">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
