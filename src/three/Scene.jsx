import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Grid } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { scrollState, pointerState } from '../lib/scrollState'
import { PIECES, STAGE_PIECES } from './pieces'
import { damp } from './pieces/shared'

/** Static camera with pointer parallax and a little lean on scroll velocity. */
function Rig() {
  const { camera } = useThree()
  const look = useMemo(() => new THREE.Vector3(), [])
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1)
    const px = pointerState.active ? pointerState.x : 0
    const py = pointerState.active ? pointerState.y : 0
    camera.position.x = damp(camera.position.x, px * 0.8, 2.5, dt)
    camera.position.y = damp(camera.position.y, py * 0.5, 2.5, dt)
    camera.position.z = 14
    const vel = THREE.MathUtils.clamp(scrollState.vel * 0.003, -0.8, 0.8)
    look.set(px * 0.25, -vel, 0)
    camera.lookAt(look)
  })
  return null
}

/**
 * One piece on the main stage. Visible (scaled in) only while its section is at mid-viewport;
 * sits beside the text column on wide screens and in the upper part on narrow ones.
 */
function StagePiece({ id }) {
  const ref = useRef()
  const { viewport } = useThree()
  const Piece = PIECES[id]
  useFrame((_, delta) => {
    const g = ref.current
    if (!g) return
    const dt = Math.min(delta, 0.1)
    const active = scrollState.stage === id
    const wide = viewport.width / viewport.height > 1.05
    const side = scrollState.side
    const fit = wide ? Math.min(viewport.height / 11.5, (viewport.width * 0.55) / 11.5) : Math.min(viewport.height * 0.42, viewport.width * 0.95) / 11
    const targetS = active ? fit : 0.001
    const targetX = wide ? side * viewport.width * (id === 'core' ? 0.2 : 0.25) : 0
    const targetY = wide ? (id === 'core' ? -0.2 : 0) : viewport.height * 0.22
    g.scale.setScalar(damp(g.scale.x, targetS, active ? 3.2 : 4, dt))
    g.position.x = damp(g.position.x, targetX, 3, dt)
    g.position.y = damp(g.position.y, targetY, 3, dt)
    g.visible = g.scale.x > fit * 0.04
  })
  return (
    <group ref={ref} scale={0.001}>
      <Piece />
    </group>
  )
}

/** Soft nebula glows far behind the pieces: additive sprites that drift slowly. */
function Nebula() {
  const group = useRef()
  const texture = useMemo(() => {
    const cv = document.createElement('canvas')
    cv.width = cv.height = 256
    const ctx = cv.getContext('2d')
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    g.addColorStop(0, 'rgba(255,255,255,0.9)')
    g.addColorStop(0.35, 'rgba(255,255,255,0.35)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 256)
    const t = new THREE.CanvasTexture(cv)
    return t
  }, [])
  const blobs = useMemo(
    () => [
      { p: [-10, 5, -16], s: 24, c: '#8b5cf6', o: 0.11 },
      { p: [11, -6, -18], s: 26, c: '#ccff33', o: 0.045 },
    ],
    [],
  )
  useFrame((state) => {
    const t = state.clock.elapsedTime
    group.current?.children.forEach((s, i) => {
      s.position.x = blobs[i].p[0] + Math.sin(t * 0.05 + i) * 2.5
      s.position.y = blobs[i].p[1] + Math.cos(t * 0.04 + i * 2) * 1.8 - scrollState.progress * 4
    })
  })
  return (
    <group ref={group}>
      {blobs.map((b, i) => (
        <sprite key={i} position={b.p} scale={[b.s, b.s, 1]}>
          <spriteMaterial map={texture} color={b.c} transparent opacity={b.o} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </group>
  )
}

/** A receding floor grid: the one background element that reads as real depth. */
function Floor() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.position.z = (ref.current.position.z + Math.min(delta, 0.05) * 0.6) % 5
  })
  return (
    <group ref={ref} position={[0, -6.4, 0]}>
      <Grid
        args={[80, 80]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1d1d27"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#4a3f7a"
        fadeDistance={42}
        fadeStrength={1.6}
        infiniteGrid
      />
    </group>
  )
}

/** Sparse dust for depth. */
function Dust() {
  const ref = useRef()
  const geometry = useMemo(() => {
    const n = 1400
    const a = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      a[i * 3] = (Math.random() - 0.5) * 50
      a[i * 3 + 1] = (Math.random() - 0.5) * 30
      a[i * 3 + 2] = -16 + Math.random() * 20
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(a, 3))
    return g
  }, [])
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += Math.min(delta, 0.05) * 0.006
    ref.current.position.y = damp(ref.current.position.y, -scrollState.progress * 6, 2, Math.min(delta, 0.1))
  })
  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial size={0.05} color="#b8b8c8" transparent opacity={0.45} depthWrite={false} sizeAttenuation />
    </points>
  )
}

export default function Scene() {
  const mobile = window.innerWidth < 760
  return (
    <div className="stage" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 42, near: 0.1, far: 80 }}
        dpr={[1, mobile ? 1.2 : 1.35]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#060606')
          scene.fog = new THREE.Fog('#060606', 18, 50)
        }}
      >
        <Rig />
        <ambientLight intensity={0.3} />
        <directionalLight position={[6, 10, 8]} intensity={1.1} color="#f5f3ff" />
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={3} color="#ccff33" position={[0, 6, -4]} scale={[10, 3, 1]} />
          <Lightformer intensity={2.5} color="#8b5cf6" position={[-6, 0, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 3, 1]} />
          <Lightformer intensity={2.5} color="#ffffff" position={[6, -2, 3]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 2, 1]} />
        </Environment>
        <Nebula />
        <Floor />
        <Dust />
        {STAGE_PIECES.map((id) => (
          <StagePiece key={id} id={id} />
        ))}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom luminanceThreshold={0.65} luminanceSmoothing={0.3} mipmapBlur intensity={mobile ? 0.8 : 1.05} radius={0.65} resolutionScale={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
