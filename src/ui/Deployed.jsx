import Reveal from './Reveal'
import { deployed as d } from '../data/content'

export default function Deployed() {
  return (
    <section id={d.id} className="chapter chapter--text-left" data-stage={d.stage}>
      <div className="wrap">
        <div className="chapter__col">
          <Reveal className="chapter__head">
            <p className="eyebrow">
              <b>{d.num}</b> {d.kicker}
            </p>
            <h2 className="h2">{d.title}</h2>
            <p className="lead">{d.lead}</p>
          </Reveal>

          <ol className="steps steps--line">
            {d.steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 70} className="step">
                <span className="step__n">{s.n}</span>
                <div>
                  <h3>{s.h}</h3>
                  <p>{s.t}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="targets" delay={120}>
            <span className="targets__label">Deploys to</span>
            {d.targets.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
