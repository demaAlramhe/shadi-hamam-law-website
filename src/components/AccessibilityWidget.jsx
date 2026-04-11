import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  Accessibility,
  X,
  Minus,
  Plus,
  RotateCcw,
  Type,
  Monitor,
  Sun,
  Moon,
  Contrast,
  FlipHorizontal2,
  Palette,
  Underline,
  Link2,
  Heading,
  BookOpen,
  PauseCircle,
  MousePointer2,
  Focus,
  LayoutGrid,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useAccessibility } from '../hooks/useAccessibility'
import { defaultA11yPreferences } from '../config/a11yPreferences'
import { adjustFontScale, getVisibleFocusables } from '../a11y/panelHelpers'

const TRANSITION_MS = 280
const FONT_MIN = 0.75
const FONT_MAX = 1.75
const FONT_STEP = 0.0625

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function A11ySection({ title, children, className = '' }) {
  return (
    <section className={`space-y-3 ${className}`}>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </section>
  )
}

function IconSwitchRow({ id, icon, label, checked, onChange }) {
  const labelId = `${id}-label`
  const Icon = icon
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200/90 bg-zinc-50/90 px-3.5 py-3 shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset] transition hover:border-zinc-300/90 hover:bg-white">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200/80">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <span id={labelId} className="text-sm font-medium leading-snug text-zinc-800">
          {label}
        </span>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={() => onChange(!checked)}
        className={`relative flex h-8 w-[3.25rem] shrink-0 items-center rounded-full px-1 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 ${
          checked ? 'bg-zinc-900' : 'bg-zinc-300/90'
        }`}
      >
        <span
          className={`h-6 w-6 rounded-full bg-white shadow-md transition-[margin] duration-200 ease-out ${
            checked ? 'ms-auto' : ''
          }`}
          aria-hidden
        />
      </button>
    </div>
  )
}

function SegmentedThree({
  value,
  onChange,
  options,
}) {
  return (
    <div
      className="grid grid-cols-3 gap-1 rounded-2xl bg-zinc-100/90 p-1 ring-1 ring-zinc-200/80"
      role="group"
    >
      {options.map((opt) => {
        const active = value === opt.value
        const SegIcon = opt.icon
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-[11px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 ${
              active
                ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/90'
                : 'text-zinc-600 hover:bg-white/60 hover:text-zinc-900'
            }`}
          >
            <SegIcon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-center leading-tight">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function SegmentedFour({
  value,
  onChange,
  options,
}) {
  return (
    <div
      className="grid grid-cols-2 gap-1 rounded-2xl bg-zinc-100/90 p-1 ring-1 ring-zinc-200/80 sm:grid-cols-4"
      role="group"
    >
      {options.map((opt) => {
        const active = value === opt.value
        const SegIcon = opt.icon
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[10px] font-semibold leading-tight transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:text-[11px] ${
              active
                ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/90'
                : 'text-zinc-600 hover:bg-white/60 hover:text-zinc-900'
            }`}
          >
            <SegIcon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-center">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function AccessibilityWidget() {
  const { t } = useLanguage()
  const { preferences, setPreferences, resetPreferences } = useAccessibility()
  const reduceMotion = usePrefersReducedMotion()

  const [isOpen, setIsOpen] = useState(false)
  const [sheetEnter, setSheetEnter] = useState(false)
  const closeTimerRef = useRef(null)
  const panelRef = useRef(null)
  const openRef = useRef(null)
  const titleId = useId()
  const descId = useId()

  const transitionMs = reduceMotion ? 0 : TRANSITION_MS

  const closePanel = useCallback(() => {
    setSheetEnter(false)
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false)
      openRef.current?.focus()
      closeTimerRef.current = null
    }, transitionMs)
  }, [transitionMs])

  const openPanel = useCallback(() => {
    setSheetEnter(false)
    setIsOpen(true)
  }, [])

  useLayoutEffect(() => {
    if (!isOpen) return undefined
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSheetEnter(true))
    })
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    function onDocKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closePanel()
      }
    }
    document.addEventListener('keydown', onDocKey)
    return () => document.removeEventListener('keydown', onDocKey)
  }, [isOpen, closePanel])

  useEffect(() => {
    if (!isOpen || !sheetEnter) return undefined
    const panel = panelRef.current
    if (!panel) return undefined

    const list = getVisibleFocusables(panel)
    const first = list[0]
    const last = list[list.length - 1]
    const t = window.setTimeout(() => first?.focus(), reduceMotion ? 0 : 40)

    function onKey(e) {
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
    return () => {
      window.clearTimeout(t)
      panel.removeEventListener('keydown', onKey)
    }
  }, [isOpen, sheetEnter, reduceMotion])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    },
    []
  )

  const fontStep = (delta) => {
    setPreferences((p) => ({
      ...p,
      fontScale: adjustFontScale(p.fontScale, delta, FONT_MIN, FONT_MAX),
    }))
  }

  const a = t.a11y

  const overlayCls = reduceMotion
    ? sheetEnter
      ? 'opacity-100'
      : 'opacity-0'
    : `transition-opacity duration-300 ease-out ${sheetEnter ? 'opacity-100' : 'opacity-0'}`

  const sheetCls = reduceMotion
    ? sheetEnter
      ? 'translate-y-0 scale-100 opacity-100'
      : 'translate-y-3 scale-[0.98] opacity-0'
    : `transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        sheetEnter
          ? 'translate-y-0 scale-100 opacity-100'
          : 'translate-y-3 scale-[0.98] opacity-0'
      }`

  return (
    <>
      <button
        ref={openRef}
        type="button"
        onClick={openPanel}
        className="fixed bottom-28 end-6 z-[95] flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 text-charcoal-950 shadow-[0_8px_32px_-8px_rgba(201,169,98,0.55)] ring-2 ring-white/15 transition duration-300 hover:shadow-[0_12px_40px_-10px_rgba(201,169,98,0.65)] hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/70 active:scale-95 md:bottom-32 md:end-8"
        aria-label={a.openLabel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="a11y-panel"
      >
        <Accessibility className="h-7 w-7 shrink-0" aria-hidden />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-end sm:justify-end sm:p-5"
          role="presentation"
        >
          <button
            type="button"
            tabIndex={-1}
            className={`absolute inset-0 bg-zinc-950/45 backdrop-blur-[2px] ${overlayCls}`}
            aria-hidden
            onClick={closePanel}
          />
          <div
            ref={panelRef}
            id="a11y-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className={`relative z-[101] flex max-h-[min(88dvh,720px)] w-full max-w-[440px] flex-col overflow-hidden rounded-t-[26px] border border-zinc-200/90 bg-white text-zinc-900 shadow-[0_30px_100px_-32px_rgba(0,0,0,0.45)] sm:rounded-[26px] ${sheetCls}`}
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-zinc-200/80 px-5 py-4">
              <div className="min-w-0">
                <h2 id={titleId} className="font-display text-xl font-semibold tracking-tight text-zinc-900">
                  {a.panelTitle}
                </h2>
                <p id={descId} className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {a.panelDescription}
                </p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="shrink-0 rounded-2xl border border-zinc-200/90 bg-white p-2.5 text-zinc-500 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                aria-label={a.closeLabel}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <A11ySection title={a.sectionTypography}>
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200/90 bg-zinc-50/90 px-3.5 py-3 shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset]">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-zinc-800">
                    <Type className="h-4 w-4 text-zinc-600" aria-hidden />
                    {a.fontSize}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => fontStep(-FONT_STEP)}
                      disabled={preferences.fontScale <= FONT_MIN}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/90 bg-white text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-35"
                      aria-label={a.fontDecrease}
                    >
                      <Minus className="h-4 w-4" aria-hidden />
                    </button>
                    <span className="min-w-[3.5rem] text-center text-sm font-semibold tabular-nums text-zinc-900">
                      {Math.round(preferences.fontScale * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => fontStep(FONT_STEP)}
                      disabled={preferences.fontScale >= FONT_MAX}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/90 bg-white text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-35"
                      aria-label={a.fontIncrease}
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPreferences({ fontScale: defaultA11yPreferences.fontScale })
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/90 bg-white text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                      aria-label={a.fontReset}
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="a11y-letter" className="flex items-baseline justify-between text-sm font-medium text-zinc-700">
                    <span>{a.letterSpacing}</span>
                    <span className="text-xs font-semibold tabular-nums text-zinc-500">
                      {preferences.letterSpacing.toFixed(3)}em
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
                    className="h-2 w-full cursor-pointer accent-zinc-900"
                    aria-valuemin={0}
                    aria-valuemax={0.2}
                    aria-valuenow={preferences.letterSpacing}
                    aria-valuetext={`${preferences.letterSpacing.toFixed(3)}em`}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="a11y-line" className="flex items-baseline justify-between text-sm font-medium text-zinc-700">
                    <span>{a.lineHeight}</span>
                    <span className="text-xs font-semibold tabular-nums text-zinc-500">
                      {preferences.lineHeight.toFixed(2)}
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
                    className="h-2 w-full cursor-pointer accent-zinc-900"
                    aria-valuemin={1.35}
                    aria-valuemax={2.25}
                    aria-valuenow={preferences.lineHeight}
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <p className="text-xs font-medium text-zinc-600">{a.textAlignTitle}</p>
                  <SegmentedFour
                    value={preferences.textAlign}
                    onChange={(next) => setPreferences({ textAlign: next })}
                    options={[
                      { value: 'default', label: a.alignDefault, icon: LayoutGrid },
                      { value: 'start', label: a.alignStart, icon: AlignLeft },
                      { value: 'center', label: a.alignCenter, icon: AlignCenter },
                      { value: 'end', label: a.alignEnd, icon: AlignRight },
                    ]}
                  />
                </div>
              </A11ySection>

              <div className="my-5 h-px bg-zinc-200/90" />

              <A11ySection title={a.sectionDisplay}>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-zinc-600">{a.themeMode}</p>
                  <SegmentedThree
                    value={preferences.colorTheme}
                    onChange={(next) => setPreferences({ colorTheme: next })}
                    options={[
                      { value: 'default', label: a.themeSite, icon: Monitor },
                      { value: 'light', label: a.themeLight, icon: Sun },
                      { value: 'dark', label: a.themeDark, icon: Moon },
                    ]}
                  />
                </div>
                <IconSwitchRow
                  id="a11y-high-contrast"
                  icon={Contrast}
                  label={a.highContrast}
                  checked={preferences.highContrast}
                  onChange={(v) => setPreferences({ highContrast: v })}
                />
                <IconSwitchRow
                  id="a11y-invert"
                  icon={FlipHorizontal2}
                  label={a.invert}
                  checked={preferences.invert}
                  onChange={(v) => setPreferences({ invert: v })}
                />
                <IconSwitchRow
                  id="a11y-gray"
                  icon={Palette}
                  label={a.grayscale}
                  checked={preferences.grayscale}
                  onChange={(v) => setPreferences({ grayscale: v })}
                />
              </A11ySection>

              <div className="my-5 h-px bg-zinc-200/90" />

              <A11ySection title={a.sectionLinksFocus}>
                <IconSwitchRow
                  id="a11y-underline"
                  icon={Underline}
                  label={a.underlineLinks}
                  checked={preferences.underlineLinks}
                  onChange={(v) => setPreferences({ underlineLinks: v })}
                />
                <IconSwitchRow
                  id="a11y-hl-links"
                  icon={Link2}
                  label={a.highlightLinks}
                  checked={preferences.highlightLinks}
                  onChange={(v) => setPreferences({ highlightLinks: v })}
                />
                <IconSwitchRow
                  id="a11y-hl-head"
                  icon={Heading}
                  label={a.highlightHeadings}
                  checked={preferences.highlightHeadings}
                  onChange={(v) => setPreferences({ highlightHeadings: v })}
                />
                <IconSwitchRow
                  id="a11y-readable"
                  icon={BookOpen}
                  label={a.readableFont}
                  checked={preferences.readableFont}
                  onChange={(v) => setPreferences({ readableFont: v })}
                />
                <IconSwitchRow
                  id="a11y-focus"
                  icon={Focus}
                  label={a.focusHighlight}
                  checked={preferences.focusHighlight}
                  onChange={(v) => setPreferences({ focusHighlight: v })}
                />
              </A11ySection>

              <div className="my-5 h-px bg-zinc-200/90" />

              <A11ySection title={a.sectionMotionPointer}>
                <IconSwitchRow
                  id="a11y-pause"
                  icon={PauseCircle}
                  label={a.pauseAnimations}
                  checked={preferences.pauseAnimations}
                  onChange={(v) => setPreferences({ pauseAnimations: v })}
                />
                <IconSwitchRow
                  id="a11y-cursor"
                  icon={MousePointer2}
                  label={a.biggerCursor}
                  checked={preferences.biggerCursor}
                  onChange={(v) => setPreferences({ biggerCursor: v })}
                />
              </A11ySection>

              <p className="mt-5 rounded-2xl border border-zinc-200/80 bg-zinc-50 px-3.5 py-3 text-xs leading-relaxed text-zinc-500">
                {a.keyboardHelp}
              </p>

              <button
                type="button"
                onClick={() => resetPreferences()}
                className="mt-4 w-full rounded-2xl border border-zinc-200/90 bg-white py-3.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 active:scale-[0.99]"
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
