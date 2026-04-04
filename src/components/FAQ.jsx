import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      id="faq"
      className="section-y border-b border-white/[0.06] bg-charcoal-900/35"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading>{t.faq.title}</SectionHeading>
        </Reveal>

        <div className="mt-12 space-y-3 md:mt-14">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i
            return (
              <Reveal key={item.q} delayMs={i * 40}>
                <div
                  className={`overflow-hidden rounded-2xl border transition duration-300 md:rounded-3xl ${
                    open
                      ? 'border-gold-500/25 bg-white/[0.04] shadow-[0_16px_48px_-24px_rgba(0,0,0,0.5)]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full min-h-[52px] items-center justify-between gap-4 px-5 py-4 text-start text-base font-medium text-white transition hover:bg-white/[0.02] md:px-6 md:py-5"
                    aria-expanded={open}
                  >
                    <span className="leading-snug">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gold-500/85 transition-transform duration-300 ${
                        open ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-white/[0.06] px-5 pb-5 ps-5 text-sm leading-relaxed text-zinc-400/95 md:px-6 md:pb-6 md:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
