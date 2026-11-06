import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Float } from '@react-three/drei'
import * as THREE from 'three'
import { C, Packets, Spin } from './shared'

const PODS = [
  { name: 'aws', color: C.amber, pos: [-3, -0.6, 1.6] },
  { name: 'azure', color: C.sky, pos: [3, -0.6, 1.6] },
  { name: 'gcp', color: C.lime, pos: [0, -0.6, -2.6] },
]
const ROWS = 6
const COLS = 3

function Pod({ color, pos }) {
  const leds = useRef()
  const boardsRef = useRef()
  const c = useMemo(() => new THREE.Color(), [])
  const count = ROWS * COLS
  const boards = useMemo(() => {
    const out = []
    for (let r = 0; r < ROWS; r++) for (let k = 0; k < COLS; k++) out.push([(k - 1) * 0.72, r * 0.34, 0])
    return out
  }, [])

  useEffect(() => {
    const d = new THREE.Object3D()
    boards.forEach((b, i) => {
      d.position.set(b[0], b[1], b[2])
      d.updateMatrix()
      boardsRef.current.setMatrixAt(i, d.matrix)
      d.position.set(b[0], b[1] + 0.02, b[2] + 0.34)
      d.updateMatrix()
      leds.current.setMatrixAt(i, d.matrix)
    })
    boardsRef.current.instanceMatrix.needsUpdate = true
    leds.current.instanceMatrix.needsUpdate = true
  }, [boards])

  useFrame((state) => {
    const m = leds.current
    if (!m) return
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const on = Math.sin(t * (1.5 + (i % 5) * 0.7) + i * 1.3) > 0.1
      c.set(on ? color : '#1b1b24')
      if (on) c.multiplyScalar(2.2)
      m.setColorAt(i, c)
    }
    m.instanceColor.needsUpdate = true
  })

  return (
    <group position={pos}>
      <instancedMesh ref={boardsRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[0.62, 0.16, 0.62]} />
        <meshStandardMaterial color="#121218" metalness={0.7} roughness={0.35} />
      </instancedMesh>
      <instancedMesh ref={leds} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[0.5, 0.05, 0.05]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <mesh position={[0, (ROWS - 1) * 0.17, 0]}>
        <boxGeometry args={[2.3, ROWS * 0.34 + 0.2, 0.78]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 1, 1.2]} color={color} intensity={6} distance={6} decay={2} />
    </group>
  )
}

/** AI infrastructure: three GPU pods (one per cloud) on a grid floor, with traffic routed between them. */
export default function Cluster() {
  const { curves, lines, grid } = useMemo(() => {
    const ps = PODS.map((p) => new THREE.Vector3(p.pos[0], p.pos[1] + 1.1, p.pos[2]))
    const curves = []
    for (let i = 0; i < 3; i++) {
      const a = ps[i]
      const b = ps[(i + 1) % 3]
      const mid = a.clone().add(b).multiplyScalar(0.5).add(new THREE.Vector3(0, 2.2, 0))
      curves.push(new THREE.QuadraticBezierCurve3(a, mid, b), new THREE.QuadraticBezierCurve3(b, mid, a))
    }
    const lines = curves.filter((_, i) => i % 2 === 0).map((c) => c.getPoints(32))
    const grid = []
    for (let i = -5; i <= 5; i++) grid.push([i, -0.75, -5], [i, -0.75, 5], [-5, -0.75, i], [5, -0.75, i])
    return { curves, lines, grid }
  }, [])

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <Spin y={0.12}>
        <group rotation={[0.25, 0, 0]} scale={1.05}>
          <Line points={grid} segments color={C.lime} transparent opacity={0.12} lineWidth={1} />
          {PODS.map((p) => (
            <Pod key={p.name} {...p} />
          ))}
          {lines.map((pts, i) => (
            <Line key={i} points={pts} color={C.amber} transparent opacity={0.35} lineWidth={1.2} />
          ))}
          <Packets curves={curves} count={24} color={C.white} size={0.07} speed={0.35} seed={9} />
        </group>
      </Spin>
    </Float>
  )
}
