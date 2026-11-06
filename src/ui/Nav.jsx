import { useEffect, useState } from 'react'
import { scrollToId } from '../lib/useSmoothScroll'
import { profile } from '../data/content'

const LINKS = [
  { id: 'about', label: 'Profile' },
  { id: 'models', label: 'Models' },
  { id: 'agents', label: 'Agents' },
  { id: 'infra', label: 'Infra' },
  { id: 'deployed', label: 'Field' },
  { id: 'multicloud', label: 'Cloud' },
  { id: 'lab', label: 'Lab' },
  { id: 'projects', label: 'Projects' },
  { id: 'opensource', label: 'OSS' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ids = ['hero', ...LINKS.map((l) => l.id)]
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
        {profile.first[0]}
        {profile.last[0]}
        <span>.</span>
      </button>

      <nav className={`nav__links ${open ? 'is-open' : ''}`}>
        {LINKS.map((l) => (
          <button key={l.id} className={active === l.id ? 'is-active' : ''} onClick={() => go(l.id)}>
            {l.label}
          </button>
        ))}
      </nav>

      <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
        <span />
        <span />
      </button>
    </header>
  )
}
