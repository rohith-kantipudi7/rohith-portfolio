import { useEffect, useState } from 'react'
import { scrollToId } from '../lib/useSmoothScroll'
import { profile } from '../data/profile'

const LINKS = [
  { id: 'about', label: 'Profile' },
  { id: 'research', label: 'Research' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'systems', label: 'Systems' },
  { id: 'opensource', label: 'Open source' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ids = ['hero', ...LINKS.map((l) => l.id), 'contact']
    const onScroll = () => {
      const mid = window.innerHeight * 0.4
      let cur = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) cur = id
      }
      setActive(cur)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="nav">
      <div className="nav__bar" style={{ transform: `scaleX(${progress})` }} />
      <button className="nav__logo" onClick={() => go('hero')} aria-label="Back to top">
        {profile.name}
      </button>

      <nav className={`nav__links ${open ? 'is-open' : ''}`}>
        {LINKS.map((l) => (
          <button key={l.id} className={active === l.id ? 'is-active' : ''} onClick={() => go(l.id)}>
            {l.label}
          </button>
        ))}
        <a className="nav__cv nav__cv--mobile" href={profile.cv} target="_blank" rel="noreferrer">
          CV ↗
        </a>
      </nav>

      <div className="nav__right">
        <a className="nav__cv mono" href={profile.cv} target="_blank" rel="noreferrer">
          CV ↗
        </a>
        <button className="btn btn--solid btn--sm" onClick={() => go('contact')} data-cursor>
          Let’s talk
        </button>
        <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
