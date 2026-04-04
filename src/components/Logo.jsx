import { useLanguage } from '../hooks/useLanguage'
import { siteConfig } from '../config/siteConfig'

export function Logo({ variant = 'header', hoverable = false, className = '' }) {
  const { locale } = useLanguage()
  const alt = locale === 'he' ? siteConfig.officeNameHe : siteConfig.officeNameAr
  const knockout = siteConfig.logoRasterKnockout

  const wrap = !knockout
    ? 'bg-transparent'
    : variant === 'footer'
      ? 'bg-charcoal-900'
      : 'bg-charcoal-950'

  const size =
    variant === 'footer'
      ? 'h-11 max-w-[min(220px,72vw)]'
      : 'h-10 max-w-[min(200px,55vw)] md:h-11'

  return (
    <span
      className={`inline-flex items-center justify-center rounded-sm ${wrap} ${
        hoverable ? 'transition-transform duration-300 group-hover:scale-[1.02]' : ''
      } ${className}`}
      style={knockout ? { isolation: 'isolate' } : undefined}
    >
      <img
        src={siteConfig.logoUrl}
        alt={alt}
        className={`w-auto ${size} object-contain object-start ${knockout ? 'logo-mark-img' : ''}`}
        loading={variant === 'footer' ? 'lazy' : 'eager'}
        decoding="async"
      />
    </span>
  )
}
