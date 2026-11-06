import { scrollToId } from '../lib/useSmoothScroll'
import { profile } from '../data/profile'
import { hero, roleLine } from '../data/content'

/** Full-bleed hero: portrait and a short lead on the left, the 3D core on the right, the name across the bottom. */
export default function Hero() {
  const words = profile.name.trim().split(/\s+/)
  // Size the display name so the longest word always fits comfortably.
  const longest = Math.max(...words.map((w) => w.length), 4)
  const nameSize = `clamp(2.4rem, calc(70vw / ${longest} * 1.02), 8.5rem)`
  return (
    <section id="hero" className="hero" data-stage="core" data-side="1">
      <div className="hero__top">
        <p className="chip chip--live">
          <i /> {hero.status}
        </p>
        <p className="mono hero__role">{roleLine}</p>
      </div>

      <div className="hero__mid">
        <div className="hero__text">
          <div className="hero__who">
            {profile.photo && (
              <span className="hero__avatar">
                <img src={profile.photo} alt={profile.name} draggable="false" />
              </span>
            )}
            <div>
              <strong>{profile.name}</strong>
              <span className="mono">{hero.title}</span>
            </div>
          </div>
          <p className="hero__lead">{hero.lead}</p>
          <div className="hero__cta">
            <button className="btn btn--solid" onClick={() => scrollToId('systems')} data-cursor>
              See the systems <span>↓</span>
            </button>
            <a className="btn" href={profile.cv} target="_blank" rel="noreferrer" data-cursor>
              Download CV <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero__bottom">
        <h1 className="hero__name" aria-label={profile.name} style={{ fontSize: nameSize }}>
          {words.map((w, i) => (
            <span key={i} className="hero__word" style={{ animationDelay: `${1.3 + i * 0.1}s` }}>
              {w}
            </span>
          ))}
        </h1>
        <div className="hero__sub">
          <ul className="hero__focus" aria-label="Focus areas">
            {hero.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="mono hero__scroll" aria-hidden="true">
            Scroll <i />
          </p>
        </div>
      </div>
    </section>
  )
}
