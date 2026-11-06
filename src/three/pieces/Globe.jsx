import { useMemo } from 'react'
import { Line, Float } from '@react-three/drei'
import * as THREE from 'three'
import { C, Nodes, Packets, Spin } from './shared'
import { landPoints, ll2v, REGIONS } from '../land'

const R = 2.9

const ATMO_VERT = /* glsl */ `
  varying vec3 vN; varying vec3 vV;
  void main() {
    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const ATMO_FRAG = /* glsl */ `
  uniform vec3 uColor; varying vec3 vN; varying vec3 vV;
  void main() {
    float f = pow(1.0 - max(dot(vN, vV), 0.0), 3.0);
    gl_FragColor = vec4(uColor * f * 1.6, f);
  }
`

/** Forward deployed: Earth with continents as points, cloud regions as beacons, and traffic on great-circle arcs. */
export default function Globe() {
  const { land, sites, arcs, curves } = useMemo(() => {
    const land = landPoints(7000, R)
    const sites = REGIONS.map(([la, lo]) => ll2v(la, lo).map((v) => v * R * 1.01))
    const curves = []
    const arcs = []
    for (let i = 0; i < sites.length; i++) {
      for (const j of [1, 3]) {
        const A = new THREE.Vector3(...sites[i])
        const B = new THREE.Vector3(...sites[(i + j) % sites.length])
        const chord = A.distanceTo(B)
        const pts = []
        for (let k = 0; k <= 32; k++) {
          const t = k / 32
          pts.push(A.clone().lerp(B, t).normalize().multiplyScalar(R * 1.01 + Math.sin(Math.PI * t) * (0.25 + chord * 0.18)))
        }
        curves.push(new THREE.CatmullRomCurve3(pts))
        arcs.push(pts)
      }
    }
    return { land, sites, arcs, curves }
  }, [])
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color(C.cyan) } }), [])

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <group rotation={[0.35, 0, 0.2]} scale={1.05}>
        <Spin y={0.1}>
          <mesh>
            <sphereGeometry args={[R * 0.985, 64, 48]} />
            <meshStandardMaterial color="#0a0f1c" roughness={0.9} metalness={0.1} />
          </mesh>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" array={land} count={land.length / 3} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.032} color={C.cyan} sizeAttenuation transparent opacity={0.95} />
          </points>
          <Nodes positions={sites} radius={0.07} color="#fff7ed" emissive={C.lime} intensity={3} />
          {arcs.map((pts, i) => (
            <Line key={i} points={pts} color={C.lime} transparent opacity={0.3} lineWidth={1} />
          ))}
          <Packets curves={curves} count={28} color={C.white} size={0.05} speed={0.3} seed={21} />
        </Spin>
        <mesh scale={1.12}>
          <sphereGeometry args={[R, 48, 32]} />
          <shaderMaterial vertexShader={ATMO_VERT} fragmentShader={ATMO_FRAG} uniforms={uniforms} transparent depthWrite={false} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
        </mesh>
        <pointLight position={[4, 3, 5]} color="#bfdbfe" intensity={18} distance={14} decay={2} />
      </group>
    </Float>
  )
}
