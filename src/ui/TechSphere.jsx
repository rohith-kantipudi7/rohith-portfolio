import { useEffect, useRef } from 'react'
import { sphereWords } from '../data/content'

/** Rotating 3D word sphere on a 2D canvas (Fibonacci distribution). Drag to spin it; it coasts and settles back to idle. */
export default function TechSphere() {
  const canvas = useRef(null)

  useEffect(() => {
    const cv = canvas.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    const N = sphereWords.length
    const pts = sphereWords.map((w, i) => {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const a = i * 2.399963
      return { w, x: Math.cos(a) * r, y, z: Math.sin(a) * r }
    })

    let size = 0, dpr = 1, raf, visible = true
    let ax = 0.0035, ay = 0.0045 // angular velocity
    let tx = 0, ty = 0
    let dragging = false, lx = 0, ly = 0
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      size = cv.clientWidth
      cv.width = size * dpr
      cv.height = size * dpr
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cv)

    const onMove = (e) => {
      if (dragging) {
        // Dragging sets angular velocity directly so a flick keeps coasting after release.
        ay = (e.clientX - lx) * 0.012
        ax = -(e.clientY - ly) * 0.012
        lx = e.clientX
        ly = e.clientY
        return
      }
      const r = cv.getBoundingClientRect()
      tx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 0.02
      ty = ((e.clientY - (r.top + r.height / 2)) / r.height) * 0.02
    }
    const onDown = (e) => {
      dragging = true
      lx = e.clientX
      ly = e.clientY
      cv.setPointerCapture?.(e.pointerId)
      cv.classList.add('is-drag')
    }
    const onUp = () => {
      dragging = false
      cv.classList.remove('is-drag')
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    cv.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      if (!dragging) {
        // Ease back toward the idle spin, nudged by where the pointer sits relative to the sphere.
        ay += (0.0045 + tx - ay) * 0.03
        ax += (0.0035 + ty - ax) * 0.03
      }
      const sa = Math.sin(ay), ca = Math.cos(ay), sb = Math.sin(ax), cb = Math.cos(ax)
      for (const p of pts) {
        let x = p.x * ca + p.z * sa
        let z = -p.x * sa + p.z * ca
        let y = p.y * cb - z * sb
        z = p.y * sb + z * cb
        p.x = x; p.y = y; p.z = z
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)
      const R = size * 0.38
      const sorted = [...pts].sort((a, b) => a.z - b.z)
      for (const p of sorted) {
        const depth = (p.z + 1) / 2
        const persp = 0.6 + depth * 0.7
        const fs = (10 + depth * 9) * (size / 520 + 0.45)
        ctx.font = `${depth > 0.55 ? 500 : 400} ${fs}px "Fira Code", monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = `rgba(${Math.round(120 + depth * 110)}, ${Math.round(170 + depth * 70)}, 255, ${0.15 + depth * 0.85})`
        ctx.fillText(p.w, size / 2 + p.x * R * persp, size / 2 + p.y * R * persp)
      }
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      cv.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])

  return <canvas ref={canvas} className="sphere" aria-label="Rotating cloud of technologies. Drag to spin." role="img" />
}
