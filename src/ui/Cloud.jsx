import { useState } from 'react'
import Reveal from './Reveal'
import { cloud, cloudCols, cloudRows } from '../data/content'

/** Same capability, four platforms. Pick a column; on small screens only that column is shown. */
function Matrix() {
  const [sel, setSel] = useState(0)
  return (
    <div className="mx">
      <div className="mx__tabs" role="tablist" aria-label="Choose a platform">
        {cloudCols.map((c, i) => (
          <button key={c.id} role="tab" aria-selected={sel === i} className={`mx__tab ${sel === i ? 'is-sel' : ''}`} style={{ '--c': c.c }} onClick={() => setSel(i)} onMouseEnter={() => setSel(i)}>
            <i /> <span className="long">{c.label}</span>
            <span className="short">{c.short}</span>
          </button>
        ))}
      </div>
      <div className="mx__table">
        {cloudRows.map((r) => (
          <div key={r.k} className="mx__row">
            <div className="mx__key mono">{r.k}</div>
            {r.v.map((v, i) => (
              <div key={i} className={`mx__cell ${sel === i ? 'is-sel' : ''}`} style={{ '--c': cloudCols[i].c }} onMouseEnter={() => setSel(i)}>
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Multi-cloud: the portability principles and the platform matrix. */
export default function Cloud() {
  return (
    <section id="cloud" className="cloud" data-stage="none">
      <div className="wrap">
        <div className="cloud__head">
          <Reveal>
            <p className="kicker">{cloud.kicker}</p>
            <h2 className="h2">{cloud.title}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lead">{cloud.lead}</p>
          </Reveal>
        </div>

        <ul className="principles">
          {cloud.principles.map((p, i) => (
            <Reveal as="li" key={p.h} delay={i * 70} className="principle tilt">
              <span className="mono principle__n">{String(i + 1).padStart(2, '0')}</span>
              <h4>{p.h}</h4>
              <p>{p.t}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="cloud__matrix">
          <Matrix />
        </Reveal>
      </div>
    </section>
  )
}
