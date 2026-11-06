import { band } from '../data/content'

/** Solid accent band with a scrolling list of focus areas. */
export default function Band() {
  const items = [...band, ...band, ...band]
  return (
    <div className="band" aria-hidden="true">
      <div className="band__track">
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
