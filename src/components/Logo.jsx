import { useLanguage } from '../hooks/useLanguage'
import { siteConfig } from '../config/siteConfig'

export function Logo({ variant = 'header', hoverable = false, className = '' }) {
  const { locale } = useLanguage()
  const alt = locale === 'he' ? siteConfig.officeNameHe : siteConfig.officeNameAr

  const size =
    variant === 'footer'
      ? 'h-20 max-w-[min(420px,88vw)] md:h-24'
      : 'h-16 max-w-[min(380px,78vw)] md:h-20'

  return (
    <span
      className={`inline-flex items-center justify-center rounded-sm bg-transparent ${
        hoverable ? 'transition-transform duration-300 group-hover:scale-[1.02]' : ''
      } ${className}`}
    >
      <img
        src="/logo.png"
        alt={alt}
        className={`w-auto ${size} object-contain object-start`}
        loading={variant === 'footer' ? 'lazy' : 'eager'}
        decoding="async"
      />
    </span>
  )
}
