import { useEffect, useRef, useState } from 'react'
import { scrollState } from '../lib/scrollState'
import { STAGES } from '../three/stages'

/** Small readout of which 3D scene is on screen; reads the shared scroll state, re-renders only on change. */
export default function Hud() {
  const [stage, setStage] = useState(0)
  const last = useRef(0)

  useEffect(() => {
    let raf
    const tick = () => {
      const s = Math.min(scrollState.stage, STAGES.length - 1)
      if (s !== last.current) {
        last.current = s
        setStage(s)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="hud" aria-hidden="true">
      <span className="hud__dot" />
      <span className="hud__idx">{String(stage + 1).padStart(2, '0')}/{String(STAGES.length).padStart(2, '0')}</span>
      <span className="hud__name" key={stage}>{STAGES[stage].label}</span>
    </div>
  )
}
