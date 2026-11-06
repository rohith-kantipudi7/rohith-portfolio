import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Float } from '@react-three/drei'
import * as THREE from 'three'
import { C, Packets, Ring } from './shared'

const R = 2.3

/** Quantum: a Bloch sphere with a precessing state vector, plus an entangled partner qubit. */
export default function Quantum() {
  const vec = useRef()
  const link = useRef()
  const partner = useRef()

  const { axes, orbits } = useMemo(() => {
    const axes = [[-R * 1.25, 0, 0], [R * 1.25, 0, 0], [0, -R * 1.25, 0], [0, R * 1.25, 0], [0, 0, -R * 1.25], [0, 0, R * 1.25]]
    const orbits = [0.7, -0.5, 1.9].map((tilt) => {
      const pts = []
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.cos(a) * R * 1.02, Math.sin(a) * R * 1.02 * Math.cos(tilt), Math.sin(a) * R * 1.02 * Math.sin(tilt)))
      }
      return new THREE.CatmullRomCurve3(pts, true)
    })
    return { axes, orbits }
  }, [])

  useFrame((state, delta) => {
    if (!vec.current) return
    const t = state.clock.elapsedTime
    vec.current.rotation.y = t * 0.9
    link.current.material.opacity = 0.35 + Math.sin(t * 3) * 0.25
    partner.current.rotation.y -= Math.min(delta, 0.05) * 0.8
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group rotation={[0.3, 0.4, 0]}>
        <mesh>
          <sphereGeometry args={[R, 48, 32]} />
          <meshPhysicalMaterial color={C.magenta} transparent opacity={0.08} roughness={0.1} />
        </mesh>
        <mesh>
          <sphereGeometry args={[R, 28, 18]} />
          <meshBasicMaterial color={C.magenta} wireframe transparent opacity={0.12} toneMapped={false} />
        </mesh>
        <Ring r={R} tube={0.012} color={C.magenta} intensity={2} />
        <Ring r={R} tube={0.012} color={C.cyan} intensity={2} rotation={[Math.PI / 2, 0, 0]} />
        <Ring r={R} tube={0.012} color={C.violet} intensity={2} rotation={[0, Math.PI / 2, 0]} />
        <Line points={axes} segments color="#fae8ff" transparent opacity={0.45} lineWidth={1} />
        {[R, -R].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={C.white} toneMapped={false} />
          </mesh>
        ))}
        <group ref={vec}>
          <group rotation={[0, 0, -0.95]}>
            <mesh position={[0, R * 0.5, 0]}>
              <cylinderGeometry args={[0.03, 0.03, R, 8]} />
              <meshStandardMaterial color={C.lime} emissive={C.lime} emissiveIntensity={3} />
            </mesh>
            <mesh position={[0, R, 0]}>
              <coneGeometry args={[0.12, 0.35, 12]} />
              <meshStandardMaterial color={C.lime} emissive={C.lime} emissiveIntensity={3} />
            </mesh>
            <mesh position={[0, R, 0]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshBasicMaterial color="#f7ffd6" toneMapped={false} />
            </mesh>
            <pointLight position={[0, R, 0]} color={C.lime} intensity={6} distance={6} decay={2} />
          </group>
        </group>
        <Packets curves={orbits} count={14} color={C.white} size={0.06} speed={0.2} seed={13} />
        <group ref={partner} position={[3.4, 1.6, -0.6]}>
          <mesh>
            <sphereGeometry args={[0.62, 20, 14]} />
            <meshBasicMaterial color={C.violet} wireframe transparent opacity={0.3} toneMapped={false} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#ddd6fe" emissive={C.violet} emissiveIntensity={2.5} />
          </mesh>
          <Ring r={0.62} tube={0.01} color={C.violet} intensity={1.6} rotation={[1.2, 0, 0]} />
        </group>
        <mesh ref={link} position={[1.7, 0.8, -0.3]} rotation={[0, 0, -0.44]}>
          <cylinderGeometry args={[0.012, 0.012, 3.9, 6]} />
          <meshBasicMaterial color={C.magenta} transparent opacity={0.4} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}
