import { HeartHandshake, Eye, ListChecks, Headphones } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const icons = [HeartHandshake, Eye, ListChecks, Headphones]

export function WhyChooseUs() {
  const { t } = useLanguage()

  return (
    <section
      id="why"
      className="section-y border-b border-white/[0.06] bg-[radial-gradient(ellipse_at_top,rgba(201,169,98,0.06),transparent_50%)] bg-charcoal-900/50"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading>{t.why.title}</SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {t.why.items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={item.title} delayMs={i * 60}>
                <article className="card-interactive group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.05] to-transparent p-8 transition duration-500 hover:border-gold-500/25 md:rounded-3xl md:p-9">
                  <div className="pointer-events-none absolute -end-10 -top-10 h-36 w-36 rounded-full bg-gold-500/[0.06] blur-3xl transition duration-700 group-hover:bg-gold-500/12" />
                  <div className="relative flex items-start gap-5">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/[0.1] text-gold-400 ring-1 ring-gold-500/25 transition duration-500 group-hover:bg-gold-500/15">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-zinc-400/95">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
