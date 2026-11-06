import { useEffect } from 'react'
import Lenis from 'lenis'
import { scrollState } from './scrollState'

let lenis = null

/** Smooth-scroll to a section id (used by the nav). */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Lenis smooth scrolling + publishes scroll progress and the "active stage"
 * (the [data-stage] section crossing the middle of the viewport) to scrollState.
 */
export function useSmoothScroll() {
  useEffect(() => {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })

    let stageEls = []
    const refresh = () => {
      stageEls = Array.from(document.querySelectorAll('[data-stage]'))
    }
    const detect = () => {
      const mid = window.innerHeight * 0.5
      for (const el of stageEls) {
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) {
          scrollState.stage = Number(el.dataset.stage)
          return
        }
      }
    }

    lenis.on('scroll', ({ scroll, limit, velocity }) => {
      scrollState.y = scroll
      scrollState.progress = limit > 0 ? scroll / limit : 0
      scrollState.vel = velocity
      detect()
    })

    refresh()
    detect()
    const ro = new ResizeObserver(() => {
      refresh()
      detect()
    })
    ro.observe(document.body)

    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      lenis.destroy()
      lenis = null
    }
  }, [])
}
