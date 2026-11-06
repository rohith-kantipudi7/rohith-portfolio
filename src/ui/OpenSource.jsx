import Reveal from './Reveal'
import { openSource as o } from '../data/content'

export default function OpenSource() {
  return (
    <section id="opensource" className="oss" data-stage="6">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">
            <b>09</b> {o.kicker}
          </p>
          <h2 className="h2 oss__title">{o.title}</h2>
          <p className="lead">{o.lead}</p>
        </Reveal>

        <div className="oss__grid">
          {o.areas.map((a, i) => (
            <Reveal key={a.h} delay={(i % 2) * 80} className="ossc">
              <span className="ossc__i">{String(i + 1).padStart(2, '0')}</span>
              <h3>{a.h}</h3>
              <p>{a.t}</p>
              <div className="ossc__tags">
                {a.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="oss__flow" aria-label="Contribution workflow">
          <p className="lab__label">How a contribution moves</p>
          <ol>
            {o.flow.map((s, i) => (
              <li key={s} style={{ '--i': i }}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                {s}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
