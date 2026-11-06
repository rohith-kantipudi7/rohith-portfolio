import { useEffect, useState } from 'react'
import { profile } from '../data/content'

/** Short boot sequence: counter 0→100, then the curtain lifts. */
export default function Loader() {
  const [n, setN] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const dur = 1500
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => setLeaving(true), 150)
        setTimeout(() => setGone(true), 1100)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !gone && !leaving)
    return () => document.documentElement.classList.remove('is-loading')
  }, [gone, leaving])

  if (gone) return null
  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="loader__top">
        <span>{profile.name}</span>
        <span>Portfolio · {new Date().getFullYear()}</span>
      </div>
      <div className="loader__count">
        {String(n).padStart(3, '0')}
        <small>%</small>
      </div>
      <div className="loader__line">
        <i style={{ transform: `scaleX(${n / 100})` }} />
      </div>
      <div className="loader__log">
        <span className={n > 8 ? 'on' : ''}>init · particles</span>
        <span className={n > 40 ? 'on' : ''}>load · models</span>
        <span className={n > 75 ? 'on' : ''}>connect · clouds</span>
        <span className={n > 96 ? 'on' : ''}>ready</span>
      </div>
    </div>
  )
}
