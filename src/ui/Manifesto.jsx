import Reveal from './Reveal'
import { manifesto } from '../data/content'

/** Renders **highlighted** words as <em>. */
function Rich({ text }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))
}

/** A large typographic statement, then the four pillars. */
export default function Manifesto() {
  return (
    <section id="about" className="manifesto" data-stage="none">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{manifesto.kicker}</p>
          <p className="manifesto__text">
            <Rich text={manifesto.text} />
          </p>
        </Reveal>
        <ol className="pillars">
          {manifesto.pillars.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 80} className="pillar">
              <span className="mono pillar__n">{p.n}</span>
              <h3>{p.h}</h3>
              <p>{p.t}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
