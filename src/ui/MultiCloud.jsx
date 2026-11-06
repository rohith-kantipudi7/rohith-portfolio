import { useState } from 'react'
import Reveal from './Reveal'
import { cloudCols, cloudRows, portability, archLayers, archRails } from '../data/content'

/** Layered reference architecture; a pulse sweeps down the stack to show a request path. */
function Architecture() {
  return (
    <div className="arch" role="img" aria-label="Reference architecture from edge to GPU compute, with evals, guardrails and tracing across all layers">
      <div className="arch__stack">
        {archLayers.map((l, i) => (
          <div key={l.id} className="arch__layer" style={{ '--i': i }}>
            <span className="arch__k">{l.k}</span>
            <span className="arch__t">{l.t}</span>
            <span className="arch__n">{l.n}</span>
          </div>
        ))}
        <i className="arch__pulse" />
      </div>
      <div className="arch__rails">
        {archRails.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
    </div>
  )
}

/** Same capability, four platforms. Pick a column; on small screens only that column is shown. */
function Matrix() {
  const [sel, setSel] = useState(0)

  return (
    <div className="mx" data-sel={sel}>
      <div className="mx__tabs" role="tablist" aria-label="Choose a platform">
        {cloudCols.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={sel === i}
            className={`mx__tab ${sel === i ? 'is-sel' : ''}`}
            style={{ '--c': c.c }}
            onClick={() => setSel(i)}
            onMouseEnter={() => setSel(i)}
          >
            <i /> {c.label}
          </button>
        ))}
      </div>

      <div className="mx__table">
        {cloudRows.map((r) => (
          <div key={r.k} className="mx__row">
            <div className="mx__key">{r.k}</div>
            {r.v.map((v, i) => (
              <div
                key={i}
                className={`mx__cell ${sel === i ? 'is-sel' : ''}`}
                style={{ '--c': cloudCols[i].c }}
                data-col={cloudCols[i].label}
                onMouseEnter={() => setSel(i)}
              >
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MultiCloud() {
  return (
    <section id="multicloud" className="mcloud" data-stage="6">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">
            <b>06</b> Multi-cloud
          </p>
          <h2 className="h2 mcloud__title">One architecture. Any cloud.</h2>
          <p className="lead">
            I design for the customer’s platform, not mine. The same agent and inference stack maps onto AWS, Azure, GCP
            or an air-gapped cluster — only the adapters change.
          </p>
        </Reveal>

        <div className="mcloud__split">
          <Reveal className="mcloud__arch">
            <p className="lab__label">Reference architecture</p>
            <Architecture />
          </Reveal>

          <ul className="mcloud__port">
            {portability.map((p, i) => (
              <Reveal as="li" key={p.h} delay={i * 70} className="point">
                <span className="point__i">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{p.h}</h3>
                  <p>{p.t}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mcloud__matrix">
          <p className="lab__label">Equivalent building blocks · choose a platform</p>
          <Matrix />
        </Reveal>
      </div>
    </section>
  )
}
