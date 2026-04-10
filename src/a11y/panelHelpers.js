/** Selectors for elements that participate in tab order (dialog focus trap). */
export const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * @param {ParentNode} container
 * @returns {HTMLElement[]}
 */
export function getVisibleFocusables(container) {
  const nodes = container.querySelectorAll(FOCUSABLE_SELECTOR)
  return Array.from(nodes).filter(
    (el) =>
      el instanceof HTMLElement &&
      !el.hasAttribute('disabled') &&
      el.offsetParent !== null &&
      !el.closest('[aria-hidden="true"]')
  )
}

/** @param {number} scale @param {number} delta @param {number} min @param {number} max */
export function adjustFontScale(scale, delta, min, max) {
  const next = Math.round((scale + delta) * 1000) / 1000
  return Math.min(max, Math.max(min, next))
}
