import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../lib/scrollState'
import { STAGES, buildStages } from './stages'

// Particles are pushed away from the pointer (in world space) and brighten near it.
const VERT = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uSize;
  uniform float uPx;
  uniform vec2 uPointer;
  varying float vSeed;
  varying float vGlow;
  void main() {
    vec3 p = position;
    float s = aSeed * 6.2831;
    p += 0.07 * vec3(sin(uTime * 0.6 + s * 3.0), cos(uTime * 0.5 + s * 2.0), sin(uTime * 0.4 + s));
    vec4 wp = modelMatrix * vec4(p, 1.0);
    vec2 d = wp.xy - uPointer;
    float f = smoothstep(2.8, 0.0, length(d));
    wp.xy += normalize(d + vec2(1e-4)) * f * f * 1.5;
    wp.z += f * 1.2;
    vec4 mv = viewMatrix * wp;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPx * (0.55 + aSeed * 0.9) * (1.0 + f * 0.9) * (14.0 / -mv.z);
    vSeed = aSeed;
    vGlow = f;
  }
`

const FRAG = /* glsl */ `
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform float uOpacity;
  varying float vSeed;
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 c = mix(uC1, uC2, vSeed) + vGlow * 0.45;
    gl_FragColor = vec4(c, a * uOpacity * (1.0 + vGlow * 1.2));
  }
`

const damp = (cur, target, k, dt) => cur + (target - cur) * (1 - Math.exp(-k * dt))

/** Three tilted orbit rings around the active shape; tinted by the current stage palette. */
function Rings() {
  const group = useRef()
  const mats = useRef([])
  const tmp = useMemo(() => new THREE.Color(), [])
  const geometry = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a)))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])
  const specs = useMemo(
    () => [
      { r: 7.4, tilt: [1.2, 0, 0.3], speed: 0.12, o: 0.22 },
      { r: 8.4, tilt: [0.5, 0, -0.9], speed: -0.08, o: 0.14 },
      { r: 9.6, tilt: [-0.9, 0, 0.6], speed: 0.05, o: 0.09 },
    ],
    [],
  )

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const stage = STAGES[Math.min(scrollState.stage, STAGES.length - 1)]
    group.current.children.forEach((ring, i) => {
      ring.rotation.y += dt * specs[i].speed
      const m = mats.current[i]
      if (!m) return
      tmp.set(stage.palette[i % 2])
      m.color.lerp(tmp, 1 - Math.exp(-2.5 * dt))
      m.opacity = damp(m.opacity, specs[i].o * (stage.opacity ? 0.5 : 1), 2, dt)
    })
  })

  return (
    <group ref={group}>
      {specs.map((s, i) => (
        <lineLoop key={i} geometry={geometry} scale={s.r} rotation={s.tilt} frustumCulled={false}>
          <lineBasicMaterial
            ref={(m) => (mats.current[i] = m)}
            color="#7dd3fc"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineLoop>
      ))}
    </group>
  )
}

function Particles({ count }) {
  const group = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  const pointerWorld = useRef({ x: 999, y: 999 })
  const spin = useRef(0)
  const lastChange = useRef(0)
  const lastStage = useRef(-1)
  const { viewport } = useThree()

  const { geometry, material, targets, rates, current } = useMemo(() => {
    const targets = buildStages(count)
    const current = new Float32Array(targets[0]) // start as galaxy
    const seeds = new Float32Array(count)
    const rates = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      seeds[i] = Math.random()
      rates[i] = 1.1 + Math.random() * 3.2 // per-particle morph speed => organic stagger
    }
    const geometry = new THREE.BufferGeometry()
    const pos = new THREE.BufferAttribute(current, 3)
    pos.setUsage(THREE.DynamicDrawUsage)
    geometry.setAttribute('position', pos)
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20) // never frustum-cull

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 3.2 },
        uPx: { value: Math.min(window.devicePixelRatio || 1, 2) },
        uPointer: { value: new THREE.Vector2(999, 999) },
        uC1: { value: new THREE.Color(STAGES[0].palette[0]) },
        uC2: { value: new THREE.Color(STAGES[0].palette[1]) },
        uOpacity: { value: 0 },
      },
    })
    return { geometry, material, targets, rates, current }
  }, [count])

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      pointerWorld.current.x = 999
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  const tmpColor = useMemo(() => new THREE.Color(), [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime
    const stageIdx = Math.min(scrollState.stage, STAGES.length - 1)
    const stage = STAGES[stageIdx]
    const wide = viewport.width / viewport.height > 1.15

    if (stageIdx !== lastStage.current) {
      lastStage.current = stageIdx
      lastChange.current = t
    }

    // Morph point positions toward the active shape (stop once settled).
    if (t - lastChange.current < 5) {
      const target = targets[stageIdx]
      for (let i = 0, n = count; i < n; i++) {
        const k = 1 - Math.exp(-rates[i] * dt)
        const j = i * 3
        current[j] += (target[j] - current[j]) * k
        current[j + 1] += (target[j + 1] - current[j + 1]) * k
        current[j + 2] += (target[j + 2] - current[j + 2]) * k
      }
      geometry.attributes.position.needsUpdate = true
    }

    // Colours, opacity
    const u = material.uniforms
    u.uTime.value = t
    tmpColor.set(stage.palette[0])
    u.uC1.value.lerp(tmpColor, 1 - Math.exp(-2.5 * dt))
    tmpColor.set(stage.palette[1])
    u.uC2.value.lerp(tmpColor, 1 - Math.exp(-2.5 * dt))
    const targetOpacity = (stage.opacity ?? 0.9) * (wide ? 1 : 0.55)
    u.uOpacity.value = damp(u.uOpacity.value, targetOpacity, 1.6, dt)

    // Pointer in world space (z = 0 plane), smoothed
    const pw = pointerWorld.current
    const tx = pointer.current.x * viewport.width * 0.5
    const ty = pointer.current.y * viewport.height * 0.5
    const fresh = pw.x > 900
    pw.x = fresh ? tx : damp(pw.x, tx, 9, dt)
    pw.y = fresh ? ty : damp(pw.y, ty, 9, dt)
    u.uPointer.value.set(pw.x, pw.y)

    // Layout: sit beside the text on wide screens, centred behind it on narrow ones.
    const g = group.current
    const fit =
      (Math.min(viewport.height * 0.78, viewport.width * (wide ? 0.46 : 0.9)) / 12.5) * (stage.scale ?? 1)
    const targetX = wide ? stage.side * viewport.width * 0.23 : 0
    g.position.x = damp(g.position.x, targetX, 2.2, dt)
    const s = damp(g.scale.x, fit, 2.2, dt)
    g.scale.setScalar(s)

    // Slow spin + scroll-velocity kick + pointer parallax
    spin.current = damp(spin.current, 0, 2, dt) + scrollState.vel * 0.0006
    g.rotation.y += dt * 0.07 + spin.current
    g.rotation.x = damp(g.rotation.x, pointer.current.y * 0.25, 2, dt)
    g.rotation.z = damp(g.rotation.z, -pointer.current.x * 0.08, 2, dt)
  })

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} frustumCulled={false} />
      <Rings />
    </group>
  )
}

/** Deep-space dust: a sparse far layer that drifts against the pointer for parallax depth. */
function Dust({ count }) {
  const ref = useRef()
  const geometry = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 60
      a[i * 3 + 1] = (Math.random() - 0.5) * 34
      a[i * 3 + 2] = -6 - Math.random() * 26
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(a, 3))
    return g
  }, [count])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    g.rotation.y += delta * 0.01
    g.position.x = damp(g.position.x, -state.pointer.x * 1.4, 1.5, Math.min(delta, 0.05))
    g.position.y = damp(g.position.y, -state.pointer.y * 0.8 - scrollState.progress * 3, 1.5, Math.min(delta, 0.05))
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial size={0.06} color="#9fb4d6" transparent opacity={0.45} depthWrite={false} sizeAttenuation />
    </points>
  )
}

export default function Scene() {
  const count = useMemo(() => (window.innerWidth < 760 ? 12000 : 30000), [])
  return (
    <div className="stage" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Dust count={window.innerWidth < 760 ? 500 : 1400} />
        <Particles count={count} />
      </Canvas>
    </div>
  )
}
