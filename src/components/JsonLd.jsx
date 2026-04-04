import { useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { siteConfig } from '../config/siteConfig'

export function JsonLd() {
  const { locale } = useLanguage()

  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: locale === 'he' ? siteConfig.officeNameHe : siteConfig.officeNameAr,
      url: window.location.origin,
      telephone: [
        `+972${siteConfig.mobilePhone.replace(/\D/g, '').slice(1)}`,
        `+972${siteConfig.officePhone1.replace(/\D/g, '').slice(1)}`,
      ],
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.addressHe,
        addressLocality: 'קרית מוצקין',
        addressCountry: 'IL',
      },
      sameAs: [siteConfig.instagram, siteConfig.facebook],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.shadiLd = '1'
    script.textContent = JSON.stringify(data)

    const prev = document.querySelector('script[data-shadi-ld="1"]')
    if (prev) prev.remove()

    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [locale])

  return null
}
