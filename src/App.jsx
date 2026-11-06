import { Suspense, lazy, useEffect } from 'react'
import { useSmoothScroll } from './lib/useSmoothScroll'
import { useTilt } from './lib/useTilt'
import { profile } from './data/profile'
import ErrorBoundary from './ui/ErrorBoundary'
import Loader from './ui/Loader'
import Cursor from './ui/Cursor'
import Nav from './ui/Nav'
import Hero from './ui/Hero'
import Band from './ui/Band'
import Manifesto from './ui/Manifesto'
import Chapters from './ui/Chapters'
import Cloud from './ui/Cloud'
import Systems from './ui/Systems'
import OpenSource from './ui/OpenSource'
import Contact from './ui/Contact'

const Scene = lazy(() => import('./three/Scene'))

export default function App() {
  useSmoothScroll()
  useTilt('.tilt')

  useEffect(() => {
    document.title = `${profile.name} — AI Researcher & AI Engineer`
  }, [])

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
      <main>
        <Hero />
        <Band />
        <Manifesto />
        <Chapters />
        <Cloud />
        <Systems />
        <OpenSource />
        <Contact />
      </main>
    </>
  )
}
