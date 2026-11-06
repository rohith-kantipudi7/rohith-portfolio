import { useMemo } from 'react'
import { Line, Float } from '@react-three/drei'
import * as THREE from 'three'
import { C, Glass, Nodes, Packets, Spin } from './shared'

const SIZES = [3, 5, 6, 5, 3]

/** Foundation models: glass layers with neurons, dense connections and signals flowing through. */
export default function Network() {
  const { nodes, segs, curves } = useMemo(() => {
    const layers = SIZES.map((s, l) => Array.from({ length: s }, (_, k) => [(l - 2) * 2.3, (k - (s - 1) / 2) * 1.15, 0]))
    const nodes = layers.flat()
    const segs = []
    const curves = []
    for (let l = 0; l < layers.length - 1; l++) {
      for (const a of layers[l]) {
        for (const b of layers[l + 1]) {
          segs.push(a, b)
          curves.push(new THREE.LineCurve3(new THREE.Vector3(...a), new THREE.Vector3(...b)))
        }
      }
    }
    return { nodes, segs, curves }
  }, [])

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <Spin y={0.18}>
        <group rotation={[0, 0.5, 0]}>
          {SIZES.map((s, l) => (
            <mesh key={l} position={[(l - 2) * 2.3, 0, 0]}>
              <boxGeometry args={[0.12, s * 1.15 + 0.9, 1.9]} />
              <Glass color="#cdb8ff" opacity={0.9} />
            </mesh>
          ))}
          <Line points={segs} segments color={C.violet} transparent opacity={0.3} lineWidth={1} />
          <Nodes positions={nodes} radius={0.15} color={C.white} emissive={C.violet} intensity={2.6} />
          <Packets curves={curves} count={40} color={C.lime} size={0.06} speed={0.45} seed={3} />
          <pointLight position={[0, 0, 3]} color={C.violet} intensity={10} distance={12} decay={2} />
        </group>
      </Spin>
    </Float>
  )
}
