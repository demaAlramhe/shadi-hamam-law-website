import { Phone, Mail, MapPin } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { siteConfig, getTelHref, getMapsExternalUrl } from '../config/siteConfig'
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

export function Footer() {
  const { t, locale } = useLanguage()
  const year = new Date().getFullYear()
  const address = locale === 'he' ? siteConfig.addressHe : siteConfig.addressAr
  const officeName = locale === 'he' ? siteConfig.officeNameHe : siteConfig.officeNameAr

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/[0.08] bg-gradient-to-b from-charcoal-900/90 to-charcoal-950 py-16 md:py-20">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo variant="footer" className="opacity-95" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-500/90">
              {t.footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2">
              {SECTION_IDS.map(({ id, key }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="text-sm text-zinc-400 transition hover:text-white"
                  >
                    {t.nav[key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-500/90">
              {t.contact.title}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li>
                <a
                  href={getTelHref(siteConfig.mobilePhone)}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 text-gold-500/70" aria-hidden />
                  {siteConfig.mobilePhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 text-gold-500/70" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={getMapsExternalUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 rounded transition hover:text-white"
                  aria-label={`${t.contact.mapOpen}: ${address}`}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/70" aria-hidden />
                  <span className="underline-offset-2 hover:underline">{address}</span>
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Instagram
              </a>
              <span className="text-zinc-600" aria-hidden>
                ·
              </span>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-zinc-500">
          © {year} {officeName}. {t.footer.rights}
        </div>

        <p className="mt-6 text-center text-[11px] font-light tracking-[0.12em] text-zinc-600">
          {t.footer.creditBefore}
          <a
            href="https://demadigitalsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors duration-300 hover:text-zinc-400"
          >
            {t.footer.creditBrand}
          </a>
        </p>
      </div>
    </footer>
  )
}
