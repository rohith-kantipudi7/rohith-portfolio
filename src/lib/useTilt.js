import { useEffect } from 'react'

/**
 * 3D hover tilt for cards. Any element matching `selector` leans toward the pointer and
 * carries a spotlight (via --mx / --my). Fine pointers only; no-op on touch.
 */
export function useTilt(selector = '.tilt', max = 7) {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      const el = e.target.closest?.(selector)
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
      el.style.setProperty('--rx', `${(0.5 - y) * max}deg`)
      el.style.setProperty('--ry', `${(x - 0.5) * max}deg`)
    }
    const onOut = (e) => {
      const el = e.target.closest?.(selector)
      if (!el || el.contains(e.relatedTarget)) return
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
    }
  }, [selector, max])
}
