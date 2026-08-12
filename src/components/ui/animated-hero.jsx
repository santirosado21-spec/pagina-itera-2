import { useEffect, useMemo, useState } from 'react'

export function AnimatedHeroTitle() {
  const titles = useMemo(() => [
    'makes good calls with AI.',
    'catches what AI gets wrong.',
    'knows when to push back.',
    'handles data responsibly.',
    'is ready to work with AI.',
  ], [])
  const [titleNumber, setTitleNumber] = useState(0)
  const [previousNumber, setPreviousNumber] = useState(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || titleNumber === titles.length - 1) return undefined

    const timeoutId = window.setTimeout(() => {
      setPreviousNumber(titleNumber)
      setTitleNumber(titleNumber + 1)
    }, 2400)

    return () => window.clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <h1 className="animated-hero-title" aria-label="Know who makes good calls with AI.">
      <span aria-hidden="true">Know who</span>
      <span className="animated-title-window" aria-hidden="true">
        {titles.map((title, index) => (
          <span
            className={`animated-title-word ${titleNumber === index ? 'is-active' : previousNumber === index ? 'is-leaving' : ''}`}
            key={title}
          >
            {title}
          </span>
        ))}
      </span>
    </h1>
  )
}
