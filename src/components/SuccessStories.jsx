import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { successStories } from '../data/successStories'
import { Reveal } from './Reveal'

export function SuccessStories() {
  const { locale, t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const closeRef = useRef(null)
  const scrollRef = useRef(null)
  const headingId = useId()
  const modalLabelId = useId()

  const alt = useCallback(
    (item) => (locale === 'he' ? item.altHe : item.altAr),
    [locale]
  )

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const eps = 3
    setCanPrev(scrollLeft > eps)
    setCanNext(scrollLeft < scrollWidth - clientWidth - eps)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return undefined
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
    }
  }, [updateScrollState])

  const scrollByStep = useCallback(
    (direction) => {
      const el = scrollRef.current
      if (!el) return
      const first = el.querySelector('[data-carousel-item]')
      const gap = 16
      const cardW = first ? first.getBoundingClientRect().width : el.clientWidth * 0.82
      const step = cardW + gap
      el.scrollBy({ left: direction * step, behavior: 'smooth' })
    },
    []
  )

  useEffect(() => {
    if (openIndex === null) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [openIndex])

  useEffect(() => {
    if (openIndex === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openIndex])

  useEffect(() => {
    if (openIndex === null) return
    closeRef.current?.focus()
  }, [openIndex])

  if (successStories.length === 0) return null

  const openItem = openIndex !== null ? successStories[openIndex] : null

  return (
    <>
      <section
        id="success"
        className="section-y border-b border-white/[0.06] bg-charcoal-950"
        aria-labelledby={headingId}
      >
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id={headingId}
                className={`text-lg font-semibold tracking-[0.04em] text-zinc-200/95 sm:text-xl ${
                  locale === 'ar' ? 'font-sans' : 'font-display'
                }`}
              >
                {t.successGallery.title}
              </h2>
              <div
                className="mx-auto mt-4 h-px w-14 bg-gradient-to-r from-transparent via-gold-500/45 to-transparent sm:mt-5 sm:w-16"
                aria-hidden
              />
            </div>
          </Reveal>

          <div className="relative mt-10 sm:mt-12 lg:mt-14">
            <div className="pointer-events-none absolute inset-y-0 start-0 z-[2] w-12 bg-gradient-to-r from-charcoal-950 to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 end-0 z-[2] w-12 bg-gradient-to-l from-charcoal-950 to-transparent sm:w-16" />

            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              disabled={!canPrev}
              className="absolute start-0 top-1/2 z-[3] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-charcoal-950/90 text-gold-300 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md transition hover:border-gold-500/40 hover:bg-charcoal-900/95 hover:text-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/55 disabled:pointer-events-none disabled:opacity-25 sm:h-12 sm:w-12"
              aria-label={t.successGallery.scrollPrev}
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              disabled={!canNext}
              className="absolute end-0 top-1/2 z-[3] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-charcoal-950/90 text-gold-300 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md transition hover:border-gold-500/40 hover:bg-charcoal-900/95 hover:text-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/55 disabled:pointer-events-none disabled:opacity-25 sm:h-12 sm:w-12"
              aria-label={t.successGallery.scrollNext}
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>

            <div
              ref={scrollRef}
              dir="ltr"
              className="flex touch-pan-x gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-12 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:px-14 [&::-webkit-scrollbar]:hidden"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {successStories.map((item, i) => (
                <div
                  key={item.image}
                  data-carousel-item
                  className="w-[min(82vw,20rem)] shrink-0 snap-start sm:w-[min(72vw,22rem)] md:w-[min(56vw,24rem)] lg:w-[min(42vw,26rem)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="group relative w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-charcoal-900/35 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.05] transition duration-500 hover:border-gold-500/25 hover:shadow-[0_28px_70px_-24px_rgba(201,169,98,0.12)] hover:ring-gold-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/55 md:rounded-3xl"
                    aria-haspopup="dialog"
                  >
                    <span className="block aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={alt(item)}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </span>
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/35 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {openItem && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalLabelId}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
            role="presentation"
          />
          <div className="relative z-[111] flex max-h-[min(92dvh,920px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-charcoal-950/95 shadow-[0_40px_120px_-32px_rgba(0,0,0,0.9)] ring-1 ring-gold-500/15 md:rounded-3xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-3 py-2 sm:px-4">
              <span id={modalLabelId} className="sr-only">
                {t.successGallery.modalAria}
              </span>
              <span className="flex-1" aria-hidden />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpenIndex(null)}
                className="rounded-full border border-white/[0.12] bg-white/[0.06] p-2.5 text-zinc-200 transition hover:border-gold-500/35 hover:bg-white/[0.1] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/60"
                aria-label={t.successGallery.closeLabel}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-5">
              <img
                src={openItem.image}
                alt={alt(openItem)}
                className="mx-auto max-h-[min(78dvh,800px)] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
