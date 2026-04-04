import { useLanguage } from '../hooks/useLanguage'

export function SkipLink() {
  const { t } = useLanguage()

  return (
    <a
      href="#main-content"
      className="skip-to-content"
      onClick={(e) => {
        const main = document.getElementById('main-content')
        if (!main) return
        e.preventDefault()
        main.focus()
        main.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
    >
      {t.skipToContent}
    </a>
  )
}
