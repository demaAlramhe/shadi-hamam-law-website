/**
 * Single source of truth for office and branding URLs.
 * Edit values here to update the whole site.
 */
export const siteConfig = {
  officeNameHe: 'שאדי המאם , משרד עורכי דין ונוטריון',
  officeNameAr: 'شادي همام, مكتب محاماه وكاتب عدل',
  lawyerNameHe: 'שאדי המאם',
  lawyerNameAr: 'شادي همّام',
  mobilePhone: '051-555-5550',
  officePhone1: '04-9861110',
  officePhone2: '04-9944126',
  email: 'office@sh-adv.net',
  instagram: 'https://www.instagram.com/shadiadvocate/',
  facebook: 'https://www.facebook.com/SH.Hamam.Law/?locale=he_IL',
  addressHe: 'תאגיד מים וביוב סובב שפרעם. סניף טמרה',
  addressAr: 'هيئة مياه وصرف صحي محيط شفاعم – فرع طمرة',
  /** חיפוש למפת Google המוטמעת באתר */
  mapQuery: 'תאגיד מים וביוב סובב שפרעם סניף טמרה, ישראל',
  /** פתיחת ניווט ב-Waze (מיקום המשרד) */
  wazeUrl: 'https://waze.com/ul/hsvc4bth6u',
  logoUrl: '/logo.png',
  /** false when the PNG already has transparency (no white plate / no CSS tint). */
  logoRasterKnockout: false,
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

/** קישור לניווט חיצוני — Waze (מוגדר ב-wazeUrl). */
export function getMapsExternalUrl() {
  return siteConfig.wazeUrl
}
