import Reveal from './Reveal'
import { openSource as o } from '../data/content'

export default function OpenSource() {
  return (
    <section id="opensource" className="oss split" data-stage="upstream" data-side="1">
      <div className="wrap">
        <div className="split__col">
          <Reveal>
            <p className="kicker">{o.kicker}</p>
            <h2 className="h2">{o.title}</h2>
            <p className="lead">{o.lead}</p>
          </Reveal>
          <ul className="list">
            {o.areas.map((a, i) => (
              <Reveal as="li" key={a.h} delay={i * 70} className="list__item">
                <span className="mono list__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{a.h}</h4>
                  <p>{a.t}</p>
                  <div className="tags tags--sm">
                    {a.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="flow" delay={120}>
            {o.flow.map((s, i) => (
              <span key={s}>
                <b className="mono">{String(i + 1).padStart(2, '0')}</b> {s}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
