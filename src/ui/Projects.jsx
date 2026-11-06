import { useRef } from 'react'
import Reveal from './Reveal'
import TechSphere from './TechSphere'
import { projects, stack } from '../data/content'

/** Card that tilts toward the pointer and carries a cursor-following spotlight. */
function Card({ p, i }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`)
  }
  const onLeave = () => {
    const el = ref.current
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Reveal as="div" delay={(i % 3) * 80} className="cardwrap">
      <article ref={ref} className="card" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="card__top">
          <span className="card__kind">{p.kind}</span>
          <span className="card__idx">{String(i + 1).padStart(2, '0')}</span>
        </div>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <div className="card__stack">
          {p.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        {(p.code || p.demo) && (
          <div className="card__links">
            {p.code && (
              <a href={p.code} target="_blank" rel="noreferrer">
                Code ↗
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer">
                Demo ↗
              </a>
            )}
          </div>
        )}
      </article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="projects" data-stage="6">
      <div className="wrap">
        <Reveal className="projects__head">
          <p className="eyebrow">
            <b>08</b> Selected work
          </p>
          <h2 className="h2">Core AI, built end to end.</h2>
          <p className="lead">Models, agents and the systems they run on. Not wrappers around someone else’s API.</p>
        </Reveal>

        <div className="grid">
          {projects.map((p, i) => (
            <Card key={p.title} p={p} i={i} />
          ))}
        </div>

        <div className="stack">
          <Reveal className="stack__text">
            <p className="eyebrow">Toolkit</p>
            <h3 className="stack__title">The whole stack, from tensors to tenants.</h3>
            <div className="stack__grid">
              {stack.map((g) => (
                <div key={g.h} className="stack__col">
                  <h4>{g.h}</h4>
                  <ul>
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="stack__sphere" delay={120}>
            <TechSphere />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
