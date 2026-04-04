import { useLanguage } from '../hooks/useLanguage'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Process() {
  const { t } = useLanguage()

  return (
    <section id="process" className="section-y border-b border-white/[0.06] bg-charcoal-950">
      <div className="container-page">
        <Reveal>
          <SectionHeading>{t.process.title}</SectionHeading>
        </Reveal>

        <div className="relative mt-16 md:mt-20">
          <div
            className="absolute end-6 top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold-500/50 via-gold-500/15 to-transparent md:block lg:end-8"
            aria-hidden
          />
          <ol className="relative flex flex-col gap-8 md:gap-10">
            {t.process.steps.map((step, i) => (
              <Reveal key={step.title} delayMs={i * 50}>
                <li className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-12 lg:gap-16">
                  <div className="flex items-center gap-4 md:w-44 md:shrink-0 md:flex-col md:items-end">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-500/40 bg-charcoal-900/80 text-base font-bold text-gold-200 shadow-[0_0_32px_-4px_rgba(201,169,98,0.35)] ring-1 ring-gold-500/20">
                      {i + 1}
                    </span>
                  </div>
                  <div className="glass-panel card-interactive flex-1 rounded-2xl p-6 md:rounded-3xl md:p-8 lg:p-9">
                    <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-zinc-400/95">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
