import { useEffect, useRef, useState } from 'react'
import { pinProgress } from '../lib/useSmoothScroll'
import { chapters } from '../data/content'

const N = chapters.length

/**
 * Pinned research chapters. The section is tall; its inner stage sticks for the whole
 * scroll. Progress picks the active chapter, swaps the text panel and rewrites data-stage
 * so the 3D stage morphs to that chapter's piece.
 */
export default function Chapters() {
  const sec = useRef(null)
  const bar = useRef(null)
  const [active, setActive] = useState(0)
  const last = useRef(0)

  useEffect(() => {
    const el = sec.current
    let raf
    const tick = () => {
      const p = pinProgress(el)
      const i = Math.min(N - 1, Math.floor(p * N * 0.999))
      if (i !== last.current) {
        last.current = i
        el.dataset.stage = chapters[i].scene
        setActive(i)
      }
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="research" ref={sec} className="chapters" data-stage={chapters[0].scene} data-side="1" style={{ height: `${(N + 0.6) * 100}vh` }}>
      <div className="chapters__sticky">
        <div className="wrap chapters__grid">
          <aside className="chapters__side">
            <p className="kicker">02 · Research &amp; engineering</p>
            <ol className="chapters__index">
              {chapters.map((c, i) => (
                <li key={c.id} className={i === active ? 'is-active' : i < active ? 'is-done' : ''}>
                  <span className="mono">{c.num}</span> {c.kicker}
                </li>
              ))}
            </ol>
          </aside>

          <div className="chapters__panels">
            {chapters.map((c, i) => (
              <article key={c.id} id={c.id} className={`chapter ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
                <p className="kicker">
                  <b>{c.num}</b> {c.kicker}
                </p>
                <h2 className="chapter__title">{c.title}</h2>
                <p className="chapter__lead">{c.lead}</p>
                <ul className="chapter__points">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="tags">
                  {c.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="chapters__progress" aria-hidden="true">
          <i ref={bar} />
        </div>
      </div>
    </section>
  )
}
