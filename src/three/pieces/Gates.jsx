import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { C, Packets, Ring, Spin } from './shared'

/** Evaluation: candidates fly through a tunnel of gates; each gate pulses as it passes. */
export default function Gates() {
  const gates = useRef([])
  const curves = useMemo(() => {
    const out = []
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      const r = 0.5 + (i % 3) * 0.35
      out.push(new THREE.LineCurve3(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, -5.5), new THREE.Vector3(Math.cos(a + 1) * r, Math.sin(a + 1) * r, 5.5)))
    }
    return out
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    gates.current.forEach((g, i) => {
      if (!g) return
      const k = 0.5 + 0.5 * Math.sin(t * 2.2 - i * 0.9)
      g.scale.setScalar(1 + k * 0.08)
      g.children[0].material.emissiveIntensity = 1 + k * 2.5
    })
  })

  const colors = [C.amber, C.lime, C.amber, C.lime, C.amber]

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.3}>
      <Spin y={0.1}>
        <group rotation={[0.35, -0.6, 0]}>
          {colors.map((c, i) => (
            <group key={i} ref={(el) => (gates.current[i] = el)} position={[0, 0, (i - 2) * 2.2]}>
              <Ring r={2.1 - Math.abs(i - 2) * 0.15} tube={0.03} color={c} intensity={1.5} />
              <mesh>
                <torusGeometry args={[2.1 - Math.abs(i - 2) * 0.15, 0.3, 8, 80]} />
                <meshBasicMaterial color={c} transparent opacity={0.05} toneMapped={false} />
              </mesh>
            </group>
          ))}
          <Packets curves={curves} count={26} color={C.white} size={0.07} speed={0.3} seed={17} />
          <pointLight color={C.amber} intensity={8} distance={10} decay={2} />
        </group>
      </Spin>
    </Float>
  )
}
