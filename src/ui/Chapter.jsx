import Reveal from './Reveal'
import { STAGES } from '../three/stages'

/** One research/engineering chapter. Text sits opposite the 3D shape. */
export default function Chapter({ c }) {
  const shapeSide = STAGES[c.stage].side // +1 shape right => text left
  return (
    <section id={c.id} className={`chapter ${shapeSide > 0 ? 'chapter--text-left' : 'chapter--text-right'}`} data-stage={c.stage}>
      <div className="wrap">
        <div className="chapter__col">
          <div className="chapter__bignum" aria-hidden="true">
            {c.num}
          </div>
          <Reveal className="chapter__head">
            <p className="eyebrow">
              <b>{c.num}</b> {c.kicker}
            </p>
            <h2 className="h2">{c.title}</h2>
            <p className="lead">{c.lead}</p>
          </Reveal>

          <ul className="points">
            {c.points.map((p, i) => (
              <Reveal as="li" key={p.h} delay={i * 70} className="point">
                <span className="point__i">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{p.h}</h3>
                  <p>{p.t}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="tags" delay={120}>
            {c.tags.map((t) => (
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
