import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { Logo } from './Logo'

const SECTION_IDS = [
  { id: 'hero', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'services', key: 'services' },
  { id: 'why', key: 'why' },
  { id: 'process', key: 'process' },
  { id: 'faq', key: 'faq' },
  { id: 'contact', key: 'contact' },
]

export function Header({ activeId }) {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'border-white/[0.08] bg-charcoal-950/[0.88] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-charcoal-950/50 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6 lg:px-8 lg:py-4">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('hero')
          }}
          className="group flex shrink-0 items-center gap-3"
        >
          <Logo variant="header" hoverable />
        </a>

        <nav className="hidden flex-1 justify-center md:flex" aria-label="Main">
          <ul className="flex flex-wrap items-center justify-center gap-0.5 lg:gap-1">
            {SECTION_IDS.map(({ id, key }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 lg:px-4 ${
                    activeId === id
                      ? 'bg-white/[0.06] text-gold-300 shadow-[inset_0_0_0_1px_rgba(201,169,98,0.2)]'
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {t.nav[key]}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="flex rounded-full border border-white/[0.1] bg-white/[0.04] p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => setLocale('he')}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                locale === 'he'
                  ? 'bg-gold-500/25 text-gold-200 shadow-inner'
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              HE
            </button>
            <button
              type="button"
              onClick={() => setLocale('ar')}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                locale === 'ar'
                  ? 'bg-gold-500/25 text-gold-200 shadow-inner'
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              AR
            </button>
          </div>

          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="btn-primary hidden px-5 py-2.5 text-[0.8125rem] md:inline-flex"
          >
            {t.headerCta}
          </button>

          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-zinc-100 transition hover:border-white/20 hover:bg-white/[0.07] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.08] bg-charcoal-950/98 px-5 py-6 backdrop-blur-xl sm:px-6 md:hidden">
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {SECTION_IDS.map(({ id, key }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className={`w-full rounded-xl px-4 py-3.5 text-start text-base font-medium transition ${
                      activeId === id
                        ? 'bg-white/[0.06] text-gold-300'
                        : 'text-zinc-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    {t.nav[key]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="btn-primary mt-5 w-full py-3.5"
          >
            {t.headerCta}
          </button>
        </div>
      )}
    </header>
  )
}
