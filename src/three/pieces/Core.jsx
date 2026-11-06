import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { C, Glass, Nodes, Ring } from './shared'

/** Hero: a glass crystal around a glowing violet core, a particle disc and two orbit rings. Calmer than a blob. */
export default function Core() {
  const shell = useRef()
  const wire = useRef()
  const disc = useRef()
  const orbit = useRef()

  const { discGeo, sats } = useMemo(() => {
    let a = 7
    const rnd = () => ((a = (a * 9301 + 49297) % 233280) / 233280)
    const n = 900
    const pos = new Float32Array(n * 3)
    const col = new Float32Array(n * 3)
    const lime = new THREE.Color(C.lime)
    const cyan = new THREE.Color(C.cyan)
    const tmp = new THREE.Color()
    for (let i = 0; i < n; i++) {
      const r = 3.3 + Math.pow(rnd(), 0.6) * 1.6
      const t = rnd() * Math.PI * 2
      pos[i * 3] = Math.cos(t) * r
      pos[i * 3 + 1] = (rnd() - 0.5) * 0.12
      pos[i * 3 + 2] = Math.sin(t) * r
      tmp.copy(lime).lerp(cyan, rnd())
      col[i * 3] = tmp.r
      col[i * 3 + 1] = tmp.g
      col[i * 3 + 2] = tmp.b
    }
    const discGeo = new THREE.BufferGeometry()
    discGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    discGeo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const sats = []
    for (let i = 0; i < 26; i++) {
      const u = rnd() * 2 - 1
      const t = rnd() * Math.PI * 2
      const q = Math.sqrt(1 - u * u)
      const r = 3.8 + rnd() * 1.6
      sats.push([q * Math.cos(t) * r, u * r * 0.8, q * Math.sin(t) * r])
    }
    return { discGeo, sats }
  }, [])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    if (shell.current) {
      shell.current.rotation.y += dt * 0.12
      shell.current.rotation.x += dt * 0.04
    }
    if (wire.current) {
      wire.current.rotation.y -= dt * 0.3
      wire.current.rotation.z += dt * 0.1
    }
    if (disc.current) disc.current.rotation.y += dt * 0.08
    if (orbit.current) orbit.current.rotation.y -= dt * 0.05
  })

  return (
    <group>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh ref={shell}>
          <icosahedronGeometry args={[2.4, 2]} />
          <Glass color="#a89cff" transmission={0.75} thickness={0.5} opacity={0.6} roughness={0.08} />
        </mesh>
        <mesh ref={wire}>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color={C.lime} wireframe transparent opacity={0.4} toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.62, 32, 32]} />
          <meshStandardMaterial color="#c4b5fd" emissive={C.violet} emissiveIntensity={1.6} roughness={0.3} />
        </mesh>
        <pointLight color={C.violet} intensity={7} distance={9} decay={2} />
        <Ring r={3.1} tube={0.012} rotation={[1.25, 0, 0.35]} color={C.lime} intensity={1.4} />
        <Ring r={3.6} tube={0.01} rotation={[0.55, 0.5, -0.9]} color={C.cyan} intensity={1.1} />
      </Float>
      <group rotation={[0.45, 0, -0.25]}>
        <points ref={disc} geometry={discGeo}>
          <pointsMaterial size={0.05} vertexColors transparent opacity={0.85} depthWrite={false} sizeAttenuation />
        </points>
      </group>
      <group ref={orbit}>
        <Nodes positions={sats} radius={0.06} color={C.white} emissive={C.lime} intensity={1.2} />
      </group>
    </group>
  )
}
