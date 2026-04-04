import {
  A11Y_STORAGE_KEY,
  clampPreferences,
  defaultA11yPreferences,
  parseStoredPreferences,
} from '../config/a11yPreferences'

/**
 * Applies accessibility preferences to the document and #root filter chain.
 * @param {import('../config/a11yPreferences.js').A11yPreferences} prefs
 */
export function applyA11yPreferences(prefs) {
  const root = document.documentElement
  const appRoot = document.getElementById('root')

  const p = clampPreferences(prefs)

  root.style.setProperty('--a11y-font-scale', String(p.fontScale))
  root.style.setProperty('--a11y-letter-spacing', `${p.letterSpacing}em`)
  root.style.setProperty('--a11y-line-height', String(p.lineHeight))

  root.toggleAttribute('data-a11y-high-contrast', p.highContrast)
  root.toggleAttribute('data-a11y-underline-links', p.underlineLinks)
  root.toggleAttribute('data-a11y-highlight-links', p.highlightLinks)
  root.toggleAttribute('data-a11y-highlight-headings', p.highlightHeadings)
  root.toggleAttribute('data-a11y-readable', p.readableFont)
  root.toggleAttribute('data-a11y-pause-motion', p.pauseAnimations)
  root.toggleAttribute('data-a11y-big-cursor', p.biggerCursor)
  root.toggleAttribute('data-a11y-focus-highlight', p.focusHighlight)

  const filters = []
  if (p.invert) filters.push('invert(1) hue-rotate(180deg)')
  if (p.grayscale) filters.push('grayscale(1)')

  if (appRoot) {
    appRoot.style.filter = filters.length ? filters.join(' ') : ''
  }

  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(p))
  } catch {
    /* ignore */
  }
}

export function loadStoredPreferences() {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY)
    if (!raw) return { ...defaultA11yPreferences }
    return clampPreferences(parseStoredPreferences(raw))
  } catch {
    return { ...defaultA11yPreferences }
  }
}

export function clearA11yFromDocument() {
  const root = document.documentElement
  const appRoot = document.getElementById('root')
  const attrs = [
    'data-a11y-high-contrast',
    'data-a11y-underline-links',
    'data-a11y-highlight-links',
    'data-a11y-highlight-headings',
    'data-a11y-readable',
    'data-a11y-pause-motion',
    'data-a11y-big-cursor',
    'data-a11y-focus-highlight',
  ]
  attrs.forEach((a) => root.removeAttribute(a))
  root.style.removeProperty('--a11y-font-scale')
  root.style.removeProperty('--a11y-letter-spacing')
  root.style.removeProperty('--a11y-line-height')
  if (appRoot) appRoot.style.filter = ''
}
