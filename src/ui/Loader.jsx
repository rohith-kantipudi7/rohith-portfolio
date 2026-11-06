import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

/** Short boot sequence: counter 0→100, then the curtain lifts. */
export default function Loader() {
  const [n, setN] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const dur = 1300
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => setLeaving(true), 120)
        setTimeout(() => setGone(true), 1050)
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
      <div className="loader__top mono">
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
      <div className="loader__log mono">
        <span className={n > 8 ? 'on' : ''}>compiling shaders</span>
        <span className={n > 35 ? 'on' : ''}>loading models</span>
        <span className={n > 60 ? 'on' : ''}>spawning agents</span>
        <span className={n > 82 ? 'on' : ''}>connecting clouds</span>
        <span className={n > 96 ? 'on' : ''}>ready</span>
      </div>
    </div>
  )
}
