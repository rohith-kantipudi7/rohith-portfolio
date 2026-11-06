import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { about, stats } from '../data/content'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const run = (now) => {
          const p = Math.min((now - t0) / 1400, 1)
          setV(Math.round((1 - Math.pow(1 - p, 4)) * to))
          if (p < 1) requestAnimationFrame(run)
        }
        requestAnimationFrame(run)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to])

  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  )
}

export default function Profile() {
  return (
    <section id="about" className="about" data-stage="0">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">
            <b>00</b> {about.kicker}
          </p>
          <h2 className="h2 about__title">{about.title}</h2>
        </Reveal>

        <div className="about__body">
          {about.body.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="stat">
              <div className="stat__v">
                <Counter to={s.v} suffix={s.suffix} />
              </div>
              <div className="stat__l">{s.label}</div>
              <div className="stat__s">{s.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
