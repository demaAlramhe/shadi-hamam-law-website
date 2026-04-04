import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 end-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] bg-charcoal-900/95 text-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md transition duration-300 hover:border-gold-500/45 hover:bg-charcoal-850/95 hover:text-gold-200 active:scale-95 md:bottom-8 md:end-8"
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5" aria-hidden />
    </button>
  )
}
