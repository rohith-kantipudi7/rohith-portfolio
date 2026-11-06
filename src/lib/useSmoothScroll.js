import { useEffect } from 'react'
import Lenis from 'lenis'
import { scrollState, pointerState } from './scrollState'

let lenis = null

/** Smooth-scroll to a section id (used by the nav). */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Lenis smooth scrolling + publishes which [data-stage] section is crossing the middle of
 * the viewport, so the 3D stage can show that section's piece. Sections may rewrite their
 * own data-stage while pinned (the chapters do), so this is re-read every frame.
 */
export function useSmoothScroll() {
  useEffect(() => {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })

    let els = []
    const refresh = () => {
      els = Array.from(document.querySelectorAll('[data-stage]'))
    }
    const detect = () => {
      const mid = window.innerHeight * 0.5
      let found = null
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) {
          found = el
          break
        }
      }
      scrollState.stage = found ? found.dataset.stage : 'none'
      scrollState.side = found && found.dataset.side ? Number(found.dataset.side) : 1
    }

    lenis.on('scroll', ({ scroll, limit, velocity }) => {
      scrollState.y = scroll
      scrollState.progress = limit > 0 ? scroll / limit : 0
      scrollState.vel = velocity
    })

    const onMove = (e) => {
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1)
      pointerState.active = true
    }
    const onLeave = () => {
      pointerState.active = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    refresh()
    detect()
    const ro = new ResizeObserver(refresh)
    ro.observe(document.body)

    let raf
    const loop = (t) => {
      lenis.raf(t)
      detect()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      lenis.destroy()
      lenis = null
    }
  }, [])
}

/** Progress (0..1) of a pinned section: how far its sticky child has been scrolled through. */
export function pinProgress(el) {
  const r = el.getBoundingClientRect()
  const range = r.height - window.innerHeight
  if (range <= 0) return 0
  return Math.min(1, Math.max(0, -r.top / range))
}
