import { useEffect, useRef } from 'react'
import { scrollToId } from '../lib/useSmoothScroll'
import { profile, headline } from '../data/content'

export default function Hero() {
  const portrait = useRef(null)

  // Portrait leans toward the pointer for a subtle 3D parallax.
  useEffect(() => {
    const el = portrait.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    let tx = 0, ty = 0, cx = 0, cy = 0, raf
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      el.style.transform = `perspective(1100px) rotateY(${cx * 5}deg) rotateX(${-cy * 3}deg) translate3d(${cx * -10}px, ${cy * -6}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
  return (
    <section id="hero" className="hero" data-stage="0">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__portrait" aria-hidden="true">
        <img ref={portrait} src="/me.png" alt="" draggable="false" />
      </div>

      <div className="wrap hero__inner">
        <p className="eyebrow hero__eyebrow">
          <b>●</b> {profile.roles}
        </p>

        <h1 className="hero__title" aria-label={headline.join(' ')}>
          {headline.map((line, i) => (
            <span key={line} className="hero__line" aria-hidden="true">
              <span style={{ animationDelay: `${1.45 + i * 0.12}s` }}>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero__lead">
          I’m <strong>{profile.name}</strong>. I research and build the <strong>core of AI</strong> — models, agents and
          the <strong>infrastructure</strong> underneath — and take them into <strong>production</strong>, inside real
          customer environments, on <strong>any cloud</strong>.
        </p>

        <div className="hero__cta">
          <button className="pill" onClick={() => scrollToId('projects')} data-cursor>
            <i>+</i> See the work
          </button>
          <button className="pill pill--ghost" onClick={() => scrollToId('contact')} data-cursor>
            Get in touch
          </button>
        </div>

        <p className="hero__tagline">{profile.tagline}</p>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}
