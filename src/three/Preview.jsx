import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { PIECES } from './pieces'

/**
 * A live 3D preview for a project card: its own small canvas, rendering only while the
 * card is near the viewport so six cards stay cheap.
 */
export default function Preview({ piece, className = '', color = '#ccff33', scale = 0.8 }) {
  const box = useRef(null)
  const [on, setOn] = useState(false)
  const Piece = PIECES[piece]

  const [mounted, setMounted] = useState(false)

  // Create the WebGL context only once the card gets close, and pause it while off-screen.
  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setOn(e.isIntersecting)
        if (e.isIntersecting) setMounted(true)
      },
      { rootMargin: '600px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={box} className={className} aria-hidden="true">
      {mounted && (
      <Canvas
        frameloop={on ? 'always' : 'never'}
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 14], fov: 42, near: 0.1, far: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[6, 10, 8]} intensity={1.1} />
          <pointLight position={[-4, -2, 6]} color={color} intensity={6} distance={20} decay={2} />
          <Environment resolution={64} frames={1}>
            <Lightformer intensity={3} color={color} position={[0, 6, -4]} scale={[10, 3, 1]} />
            <Lightformer intensity={2} color="#ffffff" position={[6, -2, 3]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 2, 1]} />
          </Environment>
          <group scale={scale}>
            <Piece />
          </group>
        </Suspense>
      </Canvas>
      )}
    </div>
  )
}
