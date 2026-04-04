import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '../config/siteConfig'

export function FloatingWhatsApp() {
  const href = getWhatsAppLink()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 start-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_-8px_rgba(37,211,102,0.55)] ring-2 ring-white/15 transition duration-300 hover:scale-105 hover:shadow-[0_12px_40px_-8px_rgba(37,211,102,0.65)] active:scale-95 md:bottom-8 md:start-8"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  )
}
