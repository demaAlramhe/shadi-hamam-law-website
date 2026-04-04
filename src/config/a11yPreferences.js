export const A11Y_STORAGE_KEY = 'shadi-law-a11y-v1'

/** @typedef {typeof defaultA11yPreferences} A11yPreferences */

export const defaultA11yPreferences = {
  fontScale: 1,
  highContrast: false,
  invert: false,
  grayscale: false,
  underlineLinks: false,
  highlightLinks: false,
  highlightHeadings: false,
  readableFont: false,
  pauseAnimations: false,
  biggerCursor: false,
  focusHighlight: false,
  /** 0–0.2 em */
  letterSpacing: 0,
  /** unitless line-height for body text */
  lineHeight: 1.6,
}

export function parseStoredPreferences(raw) {
  try {
    const parsed = JSON.parse(raw)
    return { ...defaultA11yPreferences, ...parsed }
  } catch {
    return { ...defaultA11yPreferences }
  }
}

export function clampPreferences(p) {
  return {
    ...defaultA11yPreferences,
    ...p,
    fontScale: Math.min(1.375, Math.max(0.75, Number(p.fontScale) || 1)),
    letterSpacing: Math.min(0.2, Math.max(0, Number(p.letterSpacing) || 0)),
    lineHeight: Math.min(2.25, Math.max(1.35, Number(p.lineHeight) || 1.6)),
  }
}
