import { useMemo } from 'react'
import { Line, Float } from '@react-three/drei'
import * as THREE from 'three'
import { C, Nodes, Packets, Spin } from './shared'

const H = 3.6

/** Open source: a commit graph in 3D. Branches fork off the trunk, land a fix, and merge back upstream. */
export default function Upstream() {
  const { branches, nodes, curves } = useMemo(() => {
    const trunk = new THREE.LineCurve3(new THREE.Vector3(0, -H, 0), new THREE.Vector3(0, H, 0))
    const specs = [
      { x: 1.9, z: 0.6, a: -2.6, b: 0.4, c: C.magenta },
      { x: -2.2, z: -0.4, a: -1.4, b: 1.8, c: C.lime },
      { x: 1.5, z: -1.6, a: 0.2, b: 2.9, c: C.amber },
      { x: -1.6, z: 1.5, a: -3.2, b: -1.0, c: C.violet },
    ]
    const branches = specs.map((s) => {
      const pts = [new THREE.Vector3(0, s.a, 0), new THREE.Vector3(s.x * 0.7, s.a + 0.4, s.z * 0.7), new THREE.Vector3(s.x, (s.a + s.b) / 2, s.z), new THREE.Vector3(s.x * 0.7, s.b - 0.4, s.z * 0.7), new THREE.Vector3(0, s.b, 0)]
      return { curve: new THREE.CatmullRomCurve3(pts), color: s.c, mid: [s.x, (s.a + s.b) / 2, s.z] }
    })
    const nodes = []
    for (let y = -H; y <= H + 0.01; y += 0.9) nodes.push([0, y, 0])
    return { branches, nodes, curves: [trunk, ...branches.map((b) => b.curve)] }
  }, [])

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.35}>
      <Spin y={0.2}>
        <Line points={[[0, -H, 0], [0, H, 0]]} color="#f5f3ff" transparent opacity={0.7} lineWidth={2} />
        <Nodes positions={nodes} radius={0.13} color="#f8fafc" emissive="#cbd5e1" intensity={1.6} />
        {branches.map((b, i) => (
          <group key={i}>
            <Line points={b.curve.getPoints(40)} color={b.color} transparent opacity={0.6} lineWidth={1.5} />
            <mesh position={b.mid}>
              <octahedronGeometry args={[0.24, 0]} />
              <meshStandardMaterial color={b.color} emissive={b.color} emissiveIntensity={2.2} />
            </mesh>
          </group>
        ))}
        <Packets curves={curves} count={22} color={C.white} size={0.06} speed={0.22} seed={31} />
        <mesh position={[0, H, 0]}>
          <sphereGeometry args={[0.28, 20, 20]} />
          <meshBasicMaterial color="#f7ffd6" toneMapped={false} />
        </mesh>
        <pointLight position={[0, H, 0]} color={C.lime} intensity={8} distance={8} decay={2} />
      </Spin>
    </Float>
  )
}
