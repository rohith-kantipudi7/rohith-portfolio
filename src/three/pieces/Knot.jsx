import { Float, Sparkles } from '@react-three/drei'
import { C, Spin } from './shared'

/** Contact: an iridescent torus knot with a glowing core thread. */
export default function Knot() {
  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.5}>
      <Spin y={0.25} x={0.08}>
        <mesh>
          <torusKnotGeometry args={[1.7, 0.5, 240, 36]} />
          <meshPhysicalMaterial color="#1a1030" metalness={0.5} roughness={0.18} iridescence={1} iridescenceIOR={1.6} iridescenceThicknessRange={[100, 600]} clearcoat={1} envMapIntensity={2} />
        </mesh>
        <mesh>
          <torusKnotGeometry args={[1.7, 0.1, 200, 16]} />
          <meshStandardMaterial color="#f7ffd6" emissive={C.lime} emissiveIntensity={2.4} />
        </mesh>
        <pointLight color={C.lime} intensity={12} distance={10} decay={2} />
      </Spin>
      <Sparkles count={70} scale={[9, 7, 7]} size={2.4} speed={0.3} color={C.magenta} opacity={0.6} />
    </Float>
  )
}
