import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { applyA11yPreferences, clearA11yFromDocument, loadStoredPreferences } from '../a11y/applyPreferences'
import { A11Y_STORAGE_KEY, clampPreferences, defaultA11yPreferences } from '../config/a11yPreferences'
import { AccessibilityContext } from './accessibilityContext'

export function AccessibilityProvider({ children }) {
  const [preferences, setPreferencesState] = useState(() => loadStoredPreferences())

  const setPreferences = useCallback((next) => {
    setPreferencesState((prev) => {
      const merged = typeof next === 'function' ? next(prev) : { ...prev, ...next }
      return clampPreferences(merged)
    })
  }, [])

  useLayoutEffect(() => {
    applyA11yPreferences(preferences)
  }, [preferences])

  const resetPreferences = useCallback(() => {
    try {
      localStorage.removeItem(A11Y_STORAGE_KEY)
    } catch {
      /* ignore */
    }
    clearA11yFromDocument()
    setPreferencesState({ ...defaultA11yPreferences })
  }, [])

  const value = useMemo(
    () => ({
      preferences,
      setPreferences,
      resetPreferences,
    }),
    [preferences, setPreferences, resetPreferences]
  )

  return (
    <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
  )
}
