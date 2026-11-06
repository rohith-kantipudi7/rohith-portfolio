import { marquee } from '../data/content'

/** Infinite horizontal band; scroll velocity is not used so it stays calm and cheap. */
export default function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((m, i) => (
          <span key={i}>
            {m}
            <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  )
}
