import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  Accessibility,
  X,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useAccessibility } from '../hooks/useAccessibility'
import { defaultA11yPreferences } from '../config/a11yPreferences'

function ToggleRow({ id, label, checked, onChange }) {
  const labelId = `${id}-label`
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 transition hover:border-white/[0.12] hover:bg-white/[0.05]">
      <span id={labelId} className="text-sm font-medium text-zinc-200">
        {label}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/60 ${
          checked ? 'bg-gold-500/40' : 'bg-zinc-700'
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? 'end-0.5' : 'start-0.5'
          }`}
          aria-hidden
        />
      </button>
    </div>
  )
}

export function AccessibilityWidget() {
  const { t } = useLanguage()
  const { preferences, setPreferences, resetPreferences } = useAccessibility()
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const openRef = useRef(null)
  const titleId = useId()
  const descId = useId()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return undefined
    const panel = panelRef.current
    if (!panel) return undefined

    const focusables = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const list = Array.from(focusables).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    )
    const first = list[0]
    const last = list[list.length - 1]
    first?.focus()

    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        openRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || list.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    panel.addEventListener('keydown', onKey)
    return () => panel.removeEventListener('keydown', onKey)
  }, [open, close])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const fontStep = (delta) => {
    setPreferences((p) => ({
      ...p,
      fontScale: Math.min(1.375, Math.max(0.75, Math.round((p.fontScale + delta) * 1000) / 1000)),
    }))
  }

  const a = t.a11y

  return (
    <>
      <button
        ref={openRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-28 end-6 z-[95] flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] bg-charcoal-900/95 text-gold-300 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md transition hover:border-gold-500/40 hover:bg-charcoal-850/95 hover:text-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/70 active:scale-95 md:bottom-32 md:end-8"
        aria-label={a.openLabel}
        aria-expanded={open}
        aria-controls="a11y-panel"
      >
        <Accessibility className="h-6 w-6" aria-hidden />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-stretch sm:justify-end"
          role="presentation"
        >
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden
            onClick={close}
          />
          <div
            ref={panelRef}
            id="a11y-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative z-[101] flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-2xl border border-white/[0.1] bg-charcoal-950/98 shadow-[0_-40px_100px_-40px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:max-h-screen sm:rounded-none sm:border-y-0 sm:border-s-0 sm:border-e sm:border-white/[0.08]"
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-6">
              <div>
                <h2 id={titleId} className="font-display text-xl font-semibold text-white">
                  {a.panelTitle}
                </h2>
                <p id={descId} className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {a.panelDescription}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  close()
                  openRef.current?.focus()
                }}
                className="shrink-0 rounded-full border border-white/[0.1] p-2 text-zinc-400 transition hover:border-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/60"
                aria-label={a.closeLabel}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
              <section className="space-y-3" aria-labelledby="a11y-font-heading">
                <h3 id="a11y-font-heading" className="sr-only">
                  {a.fontSize}
                </h3>
                <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                  <span className="text-sm font-medium text-zinc-200">{a.fontSize}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fontStep(-0.0625)}
                      className="rounded-full border border-white/[0.12] p-2 text-zinc-300 transition hover:border-gold-500/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/50"
                      aria-label={a.fontDecrease}
                    >
                      <Minus className="h-4 w-4" aria-hidden />
                    </button>
                    <span className="min-w-[3.25rem] text-center text-sm tabular-nums text-gold-300/90">
                      {Math.round(preferences.fontScale * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => fontStep(0.0625)}
                      className="rounded-full border border-white/[0.12] p-2 text-zinc-300 transition hover:border-gold-500/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/50"
                      aria-label={a.fontIncrease}
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPreferences({ fontScale: defaultA11yPreferences.fontScale })
                      }
                      className="rounded-full border border-white/[0.12] p-2 text-zinc-400 transition hover:border-gold-500/40 hover:text-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/50"
                      aria-label={a.fontReset}
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="a11y-letter" className="block text-sm font-medium text-zinc-300">
                    {a.letterSpacing}{' '}
                    <span className="text-gold-400/90 tabular-nums">
                      ({preferences.letterSpacing.toFixed(3)}em)
                    </span>
                  </label>
                  <input
                    id="a11y-letter"
                    type="range"
                    min={0}
                    max={0.2}
                    step={0.025}
                    value={preferences.letterSpacing}
                    onChange={(e) =>
                      setPreferences({ letterSpacing: parseFloat(e.target.value) })
                    }
                    className="h-2 w-full cursor-pointer accent-gold-500"
                    aria-valuemin={0}
                    aria-valuemax={0.2}
                    aria-valuenow={preferences.letterSpacing}
                    aria-valuetext={`${preferences.letterSpacing.toFixed(3)}em`}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="a11y-line" className="block text-sm font-medium text-zinc-300">
                    {a.lineHeight}{' '}
                    <span className="text-gold-400/90 tabular-nums">
                      ({preferences.lineHeight.toFixed(2)})
                    </span>
                  </label>
                  <input
                    id="a11y-line"
                    type="range"
                    min={1.35}
                    max={2.25}
                    step={0.05}
                    value={preferences.lineHeight}
                    onChange={(e) =>
                      setPreferences({ lineHeight: parseFloat(e.target.value) })
                    }
                    className="h-2 w-full cursor-pointer accent-gold-500"
                    aria-valuemin={1.35}
                    aria-valuemax={2.25}
                    aria-valuenow={preferences.lineHeight}
                  />
                </div>
              </section>

              <div className="mt-6 grid gap-2 sm:grid-cols-1">
                <ToggleRow
                  id="a11y-high-contrast"
                  label={a.highContrast}
                  checked={preferences.highContrast}
                  onChange={(v) => setPreferences({ highContrast: v })}
                />
                <ToggleRow
                  id="a11y-invert"
                  label={a.invert}
                  checked={preferences.invert}
                  onChange={(v) => setPreferences({ invert: v })}
                />
                <ToggleRow
                  id="a11y-gray"
                  label={a.grayscale}
                  checked={preferences.grayscale}
                  onChange={(v) => setPreferences({ grayscale: v })}
                />
                <ToggleRow
                  id="a11y-underline"
                  label={a.underlineLinks}
                  checked={preferences.underlineLinks}
                  onChange={(v) => setPreferences({ underlineLinks: v })}
                />
                <ToggleRow
                  id="a11y-hl-links"
                  label={a.highlightLinks}
                  checked={preferences.highlightLinks}
                  onChange={(v) => setPreferences({ highlightLinks: v })}
                />
                <ToggleRow
                  id="a11y-hl-head"
                  label={a.highlightHeadings}
                  checked={preferences.highlightHeadings}
                  onChange={(v) => setPreferences({ highlightHeadings: v })}
                />
                <ToggleRow
                  id="a11y-readable"
                  label={a.readableFont}
                  checked={preferences.readableFont}
                  onChange={(v) => setPreferences({ readableFont: v })}
                />
                <ToggleRow
                  id="a11y-pause"
                  label={a.pauseAnimations}
                  checked={preferences.pauseAnimations}
                  onChange={(v) => setPreferences({ pauseAnimations: v })}
                />
                <ToggleRow
                  id="a11y-cursor"
                  label={a.biggerCursor}
                  checked={preferences.biggerCursor}
                  onChange={(v) => setPreferences({ biggerCursor: v })}
                />
                <ToggleRow
                  id="a11y-focus"
                  label={a.focusHighlight}
                  checked={preferences.focusHighlight}
                  onChange={(v) => setPreferences({ focusHighlight: v })}
                />
              </div>

              <p className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-zinc-500">
                {a.keyboardHelp}
              </p>

              <button
                type="button"
                onClick={() => resetPreferences()}
                className="btn-outline mt-6 w-full border-amber-900/40 py-3.5 text-amber-100/90 hover:border-amber-700/50 hover:bg-amber-950/30"
              >
                {a.resetAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
