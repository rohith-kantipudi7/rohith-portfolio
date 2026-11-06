import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { trace, clouds } from '../data/content'

/** Terminal that "runs" an agent trace line by line, then loops. */
function Terminal() {
  const ref = useRef(null)
  const [lines, setLines] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setLines((n) => (n >= trace.length + 3 ? 0 : n + 1)), 900)
    return () => clearInterval(id)
  }, [active])

  return (
    <div className="term" ref={ref}>
      <div className="term__bar">
        <i /> <i /> <i />
        <span>agent-runtime — trace</span>
      </div>
      <div className="term__body">
        {trace.slice(0, lines).map((l, i) => (
          <p key={i} className={`term__l term__l--${l.k}`}>
            <b>{l.k}</b>
            <span>{l.t}</span>
          </p>
        ))}
        <p className="term__cursor">▍</p>
      </div>
    </div>
  )
}

/** Gateway routing requests to GPU pools on each cloud, with animated packets. */
function CloudMap() {
  const hub = { x: 300, y: 180 }
  return (
    <svg className="cmap" viewBox="0 0 600 360" role="img" aria-label="Inference gateway routing to AWS, Azure, GCP and an on-prem site">
      <defs>
        <radialGradient id="hubg">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={hub.x} cy={hub.y} r="70" fill="url(#hubg)" />
      {clouds.map((c, i) => {
        const d = `M${hub.x},${hub.y} L${c.x},${c.y}`
        return (
          <g key={c.id}>
            <path d={d} stroke={c.c} strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="4 6" fill="none" />
            <circle r="3.2" fill={c.c}>
              <animateMotion dur={`${2.4 + i * 0.5}s`} repeatCount="indefinite" path={d} />
            </circle>
            <circle r="2.4" fill={c.c} opacity="0.7">
              <animateMotion dur={`${2.4 + i * 0.5}s`} begin="-1.2s" repeatCount="indefinite" path={d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
            </circle>
            <circle cx={c.x} cy={c.y} r="26" fill="rgba(10,14,26,0.85)" stroke={c.c} strokeWidth="1.2" />
            <text x={c.x} y={c.y + 4} textAnchor="middle" className="cmap__t" fill={c.c}>
              {c.label}
            </text>
            <text x={c.x} y={c.y + (c.y < 180 ? -38 : 46)} textAnchor="middle" className="cmap__s">
              {c.sub}
            </text>
          </g>
        )
      })}
      <circle cx={hub.x} cy={hub.y} r="30" fill="#05070d" stroke="#7dd3fc" strokeWidth="1.5" />
      <circle cx={hub.x} cy={hub.y} r="30" fill="none" stroke="#7dd3fc" strokeOpacity="0.5" className="cmap__pulse" />
      <text x={hub.x} y={hub.y - 2} textAnchor="middle" className="cmap__t" fill="#eaf1ff">
        Gateway
      </text>
      <text x={hub.x} y={hub.y + 11} textAnchor="middle" className="cmap__s">
        route · fallback
      </text>
    </svg>
  )
}

export default function Lab() {
  return (
    <section id="lab" className="lab" data-stage="6">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">
            <b>07</b> The lab
          </p>
          <h2 className="h2">How it behaves when it runs.</h2>
          <p className="lead">
            Two things I care about more than demos: an agent whose every step is traced and gated, and inference that
            routes itself across clouds. Illustrative, not live data.
          </p>
        </Reveal>

        <div className="lab__grid">
          <Reveal className="lab__cell">
            <p className="lab__label">Agent run · traced &amp; evaluated</p>
            <Terminal />
          </Reveal>
          <Reveal className="lab__cell" delay={100}>
            <p className="lab__label">Inference gateway · multi-cloud</p>
            <CloudMap />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
