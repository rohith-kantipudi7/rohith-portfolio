import { Suspense, lazy } from 'react'
import { useSmoothScroll } from './lib/useSmoothScroll'
import ErrorBoundary from './ui/ErrorBoundary'
import Loader from './ui/Loader'
import Cursor from './ui/Cursor'
import Nav from './ui/Nav'
import Hero from './ui/Hero'
import Marquee from './ui/Marquee'
import Profile from './ui/Profile'
import Chapter from './ui/Chapter'
import Deployed from './ui/Deployed'
import Lab from './ui/Lab'
import Projects from './ui/Projects'
import MultiCloud from './ui/MultiCloud'
import OpenSource from './ui/OpenSource'
import Hud from './ui/Hud'
import Contact from './ui/Contact'
import { chapters } from './data/content'

const Scene = lazy(() => import('./three/Scene'))

export default function App() {
  useSmoothScroll()

  return (
    <>
      <Loader />
      <Cursor />
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </ErrorBoundary>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Nav />
      <Hud />
      <main>
        <Hero />
        <Marquee />
        <Profile />
        {chapters.map((c) => (
          <Chapter key={c.id} c={c} />
        ))}
        <Deployed />
        <MultiCloud />
        <Lab />
        <Projects />
        <OpenSource />
        <Contact />
      </main>
    </>
  )
}
