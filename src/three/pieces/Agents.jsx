import { useMemo } from 'react'
import { Line, Float } from '@react-three/drei'
import * as THREE from 'three'
import { C, Glass, Packets, Ring, Spin } from './shared'

const N = 6
const R = 3.6
const COLORS = [C.lime, C.cyan, C.amber, C.magenta, C.violet, C.sky]

/** Agentic AI: an orchestrator hub with six agents; hand-offs and tool calls flow between them. */
export default function Agents() {
  const { sats, curves, lines } = useMemo(() => {
    const sats = Array.from({ length: N }, (_, k) => {
      const a = (k * Math.PI * 2) / N
      return new THREE.Vector3(Math.cos(a) * R, (k % 2 ? 1 : -1) * 0.8, Math.sin(a) * R)
    })
    const hub = new THREE.Vector3()
    const curves = []
    sats.forEach((s, k) => {
      curves.push(new THREE.QuadraticBezierCurve3(hub, s.clone().multiplyScalar(0.5).add(new THREE.Vector3(0, 1.2, 0)), s))
      const n = sats[(k + 1) % N]
      curves.push(new THREE.QuadraticBezierCurve3(s, s.clone().add(n).multiplyScalar(0.55), n))
    })
    return { sats, curves, lines: curves.map((c) => c.getPoints(28)) }
  }, [])

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <Spin y={0.14}>
        <mesh>
          <sphereGeometry args={[1.05, 48, 48]} />
          <Glass color="#e9ffb0" />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial color="#f7ffd6" emissive={C.lime} emissiveIntensity={2.6} />
        </mesh>
        <pointLight color={C.lime} intensity={12} distance={10} decay={2} />
        <Ring r={1.5} rotation={[Math.PI / 2, 0, 0]} color={C.lime} intensity={2} />
        {sats.map((s, k) => (
          <group key={k} position={s}>
            <mesh>
              <octahedronGeometry args={[0.38, 0]} />
              <meshStandardMaterial color={COLORS[k]} emissive={COLORS[k]} emissiveIntensity={1.8} roughness={0.3} />
            </mesh>
            <Ring r={0.62} tube={0.012} rotation={[Math.PI / 2, 0, 0]} color={COLORS[k]} intensity={1.6} />
          </group>
        ))}
        {lines.map((pts, i) => (
          <Line key={i} points={pts} color={i % 2 ? C.lime : C.cyan} transparent opacity={0.32} lineWidth={1} />
        ))}
        <Packets curves={curves} count={30} color={C.white} size={0.07} speed={0.3} seed={5} />
      </Spin>
    </Float>
  )
}
