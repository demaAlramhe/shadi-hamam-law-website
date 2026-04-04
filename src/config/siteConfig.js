/**
 * Single source of truth for office and branding URLs.
 * Edit values here to update the whole site.
 */
export const siteConfig = {
  officeNameHe: 'משרד עו״ד שאדי המאם',
  officeNameAr: 'مكتب المحامي شادي همّام',
  lawyerNameHe: 'שאדי המאם',
  lawyerNameAr: 'شادي همّام',
  mobilePhone: '051-555-5550',
  officePhone1: '04-9861110',
  officePhone2: '04-9944126',
  email: 'office@sh-adv.net',
  instagram: 'https://www.instagram.com/shadiadvocate/',
  facebook: 'https://www.facebook.com/SH.Hamam.Law/?locale=he_IL',
  addressHe: 'שדרות משה גושן 14, קרית מוצקין',
  addressAr: 'شدروت موشيه غوشين 14، كريات موتسكين',
  mapQuery: 'שדרות משה גושן 14, קרית מוצקין, ישראל',
  logoUrl: '/logo.png',
  /** false when the PNG already has transparency (no white plate / no CSS tint). */
  logoRasterKnockout: true,
  lawyerImageUrl: '/lawyer-main.png',
}

/** E.164-style dial string for WhatsApp (Israel mobile). */
export function getWhatsAppLink() {
  const digits = siteConfig.mobilePhone.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `972${digits.slice(1)}` : digits
  return `https://wa.me/${intl}`
}

export function getTelHref(phone) {
  const digits = phone.replace(/\D/g, '')
  return `tel:+972${digits.slice(1)}`
}

export function getMapsEmbedSrc() {
  const q = encodeURIComponent(siteConfig.mapQuery)
  return `https://www.google.com/maps?q=${q}&output=embed`
}

export function getMapsExternalUrl() {
  const q = encodeURIComponent(siteConfig.mapQuery)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}
