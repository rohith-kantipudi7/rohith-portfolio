import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const damp = (cur, target, k, dt) => cur + (target - cur) * (1 - Math.exp(-k * dt))

// Signature palette for the 3D layer.
export const C = {
  lime: '#ccff33',
  violet: '#8b5cf6',
  cyan: '#22d3ee',
  magenta: '#f0abfc',
  amber: '#ffb347',
  sky: '#38bdf8',
  white: '#f5f3ff',
}

/** Small glowing spheres that travel along curves. */
export function Packets({ curves, count = 24, color = C.white, size = 0.07, speed = 0.25, seed = 1 }) {
  const ref = useRef()
  const state = useMemo(() => {
    let a = seed * 9301 + 49297
    const rnd = () => ((a = (a * 9301 + 49297) % 233280) / 233280)
    return Array.from({ length: count }, () => ({
      c: (rnd() * curves.length) | 0,
      t: rnd(),
      v: speed * (0.6 + rnd() * 0.9),
    }))
  }, [curves, count, speed, seed])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const p = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    const m = ref.current
    if (!m) return
    const dt = Math.min(delta, 0.05)
    for (let i = 0; i < state.length; i++) {
      const s = state[i]
      s.t += s.v * dt
      if (s.t > 1) {
        s.t -= 1
        s.c = (s.c + 1 + ((i * 7) % 3)) % curves.length
      }
      curves[s.c].getPointAt(s.t, p)
      dummy.position.copy(p)
      dummy.scale.setScalar(0.5 + Math.sin(s.t * Math.PI))
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  )
}

/** Static instanced spheres (nodes). */
export function Nodes({ positions, radius = 0.16, color = C.white, emissive = color, intensity = 2 }) {
  const ref = useRef()
  useEffect(() => {
    const m = ref.current
    if (!m) return
    const d = new THREE.Object3D()
    positions.forEach((pos, i) => {
      d.position.set(pos[0], pos[1], pos[2])
      d.updateMatrix()
      m.setMatrixAt(i, d.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  }, [positions])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]} frustumCulled={false}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={intensity} roughness={0.3} />
    </instancedMesh>
  )
}

/** Glass material used across pieces. */
export function Glass({ color = '#dcd6ff', opacity = 1, ...rest }) {
  return (
    <meshPhysicalMaterial
      color={color}
      transmission={0.9}
      thickness={1.2}
      roughness={0.15}
      ior={1.35}
      clearcoat={1}
      clearcoatRoughness={0.1}
      iridescence={0.6}
      iridescenceIOR={1.3}
      transparent
      opacity={opacity}
      envMapIntensity={1.4}
      {...rest}
    />
  )
}

/** Thin emissive ring. */
export function Ring({ r = 3, tube = 0.015, color = C.lime, intensity = 2.5, ...rest }) {
  return (
    <mesh {...rest}>
      <torusGeometry args={[r, tube, 8, 160]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} roughness={0.4} />
    </mesh>
  )
}

/** Slow spin helper. */
export function Spin({ y = 0.1, x = 0, children, ...rest }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (!ref.current) return
    const dt = Math.min(delta, 0.05)
    ref.current.rotation.y += dt * y
    ref.current.rotation.x += dt * x
  })
  return (
    <group ref={ref} {...rest}>
      {children}
    </group>
  )
}
