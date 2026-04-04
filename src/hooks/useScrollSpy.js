import { useEffect, useState } from 'react'

/**
 * @param {string[]} sectionIds
 * @param {string} [rootMargin]
 */
export function useScrollSpy(sectionIds, rootMargin = '-20% 0px -60% 0px') {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin, threshold: [0.1, 0.25, 0.5, 0.75] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, rootMargin])

  return activeId
}
