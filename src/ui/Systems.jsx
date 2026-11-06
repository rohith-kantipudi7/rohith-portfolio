import { useEffect, useRef } from 'react'
import Preview from '../three/Preview'
import { pinProgress } from '../lib/useSmoothScroll'
import { systemsIntro, systems } from '../data/content'

const PIN_MIN = 900 // below this width the gallery is a vertical stack

/** One flagship system: a tall card with its own live 3D preview. */
function Card({ s, i }) {
  const links = [['Code', s.code], ['Demo', s.demo], ['Paper', s.paper]].filter(([, u]) => u)
  return (
    <article className="card" style={{ '--c': s.color }}>
      <Preview piece={s.scene} className="card__scene" color={s.color} />
      <div className="card__body">
        <div className="card__top mono">
          <span className="card__idx">{String(i + 1).padStart(2, '0')} / {String(systems.length).padStart(2, '0')}</span>
          <span className="card__kind">{s.kind}</span>
        </div>
        <p className="card__code">{s.code}</p>
        <h3 className="card__title">{s.title}</h3>
        <p className="card__summary">{s.summary}</p>
        <ul className="card__hl">
          {s.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="card__foot">
          <div className="card__stack">
            {s.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {links.length > 0 && (
            <div className="card__links">
              {links.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noreferrer">
                  {label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

/** Horizontal gallery, pinned while you scroll through it on wide screens. */
export default function Systems() {
  const sec = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const el = sec.current
    const tr = track.current
    let extra = 0
    const measure = () => {
      if (window.innerWidth < PIN_MIN) {
        extra = 0
        el.style.height = ''
        tr.style.transform = ''
        return
      }
      extra = Math.max(0, tr.scrollWidth - window.innerWidth)
      el.style.height = `${window.innerHeight + extra}px`
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(tr)
    window.addEventListener('resize', measure)
    let raf
    const tick = () => {
      if (extra > 0) tr.style.transform = `translate3d(${-pinProgress(el) * extra}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section id="systems" ref={sec} className="systems" data-stage="none">
      <div className="systems__sticky">
        <div className="systems__track" ref={track}>
          <div className="systems__intro">
            <p className="kicker">{systemsIntro.kicker}</p>
            <h2 className="h2">{systemsIntro.title}</h2>
            <p className="lead">{systemsIntro.lead}</p>
            <p className="mono systems__hint">
              Scroll to explore <i />
            </p>
          </div>
          {systems.map((s, i) => (
            <Card key={s.code} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
