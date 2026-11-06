// Point-cloud "shapes" the 3D scene morphs between as you scroll.
// Each builder returns a Float32Array of n*3 positions, roughly within ±6 units.

import landTopo from 'world-atlas/land-110m.json'
import { feature } from 'topojson-client'

const TAU = Math.PI * 2

// Small seeded RNG so shapes are identical on every load.
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Approximate standard normal (sum of 4 uniforms).
const gauss = (r) => (r() + r() + r() + r() - 2) * 1.732

// Build the array; `fn(i, p)` writes a point into p, then it's tilted about X.
function fill(n, tilt, fn) {
  const out = new Float32Array(n * 3)
  const p = [0, 0, 0]
  const c = Math.cos(tilt)
  const s = Math.sin(tilt)
  for (let i = 0; i < n; i++) {
    fn(i, p)
    out[i * 3] = p[0]
    out[i * 3 + 1] = p[1] * c - p[2] * s
    out[i * 3 + 2] = p[1] * s + p[2] * c
  }
  return out
}

function randDir(r, p) {
  const u = r() * 2 - 1
  const a = r() * TAU
  const q = Math.sqrt(1 - u * u)
  p[0] = q * Math.cos(a)
  p[1] = u
  p[2] = q * Math.sin(a)
}

function edge(a, b, r, o, jitter) {
  const t = r()
  o[0] = a[0] + (b[0] - a[0]) * t + gauss(r) * jitter
  o[1] = a[1] + (b[1] - a[1]) * t + gauss(r) * jitter
  o[2] = a[2] + (b[2] - a[2]) * t + gauss(r) * jitter
}

function blob(c, spread, r, o) {
  o[0] = c[0] + gauss(r) * spread
  o[1] = c[1] + gauss(r) * spread
  o[2] = c[2] + gauss(r) * spread
}

/* 0 — Galaxy: calm spiral, the hero shape */
function galaxy(n, r) {
  return fill(n, 0.75, (i, o) => {
    const arm = i % 3
    const t = Math.pow(r(), 0.7)
    const rad = 0.3 + t * 6.4
    const ang = (arm * TAU) / 3 + rad * 0.75 + gauss(r) * (0.12 + 0.22 * t)
    const core = Math.exp(-rad * 0.6)
    o[0] = Math.cos(ang) * rad
    o[1] = gauss(r) * (0.12 + core * 0.9)
    o[2] = Math.sin(ang) * rad
  })
}

/* 1 — Neural network: layered nodes joined by edges (foundation models) */
function network(n, r) {
  const sizes = [3, 5, 6, 5, 3]
  const layers = sizes.map((s, l) =>
    Array.from({ length: s }, (_, k) => [(l - 2) * 3.0, (k - (s - 1) / 2) * 1.2, (r() - 0.5) * 3]),
  )
  const all = layers.flat()
  return fill(n, 0.25, (i, o) => {
    if (r() < 0.3) {
      blob(all[(r() * all.length) | 0], 0.16, r, o)
    } else {
      const l = (r() * 4) | 0
      const a = layers[l][(r() * layers[l].length) | 0]
      const b = layers[l + 1][(r() * layers[l + 1].length) | 0]
      edge(a, b, r, o, 0.04)
    }
  })
}

/* 2 — Agent graph: a hub orchestrating satellites on a ring (agentic AI) */
function agents(n, r) {
  const R = 4.4
  const hub = [0, 0, 0]
  const sats = Array.from({ length: 6 }, (_, k) => {
    const a = (k * TAU) / 6
    return [Math.cos(a) * R, (k % 2 ? 1 : -1) * 0.9, Math.sin(a) * R]
  })
  return fill(n, 0.55, (i, o) => {
    const q = r()
    if (q < 0.1) {
      blob(hub, 0.5, r, o)
    } else if (q < 0.3) {
      blob(sats[(r() * 6) | 0], 0.22, r, o)
    } else if (q < 0.62) {
      edge(hub, sats[(r() * 6) | 0], r, o, 0.035)
    } else if (q < 0.85) {
      const k = (r() * 6) | 0
      edge(sats[k], sats[(k + 1) % 6], r, o, 0.035)
    } else {
      const a = r() * TAU
      o[0] = Math.cos(a) * R + gauss(r) * 0.03
      o[1] = gauss(r) * 0.03
      o[2] = Math.sin(a) * R + gauss(r) * 0.03
    }
  })
}

/* 3 — Three lattice "clouds" linked together (multi-cloud infrastructure) */
function cloud(n, r) {
  const centers = [
    [-4, -2.2, 0],
    [4, -2.2, 0],
    [0, 3.6, 0],
  ]
  const side = 3
  return fill(n, 0.3, (i, o) => {
    if (r() < 0.72) {
      const c = centers[(r() * 3) | 0]
      o[0] = c[0] + (((r() * 5) | 0) / 4 - 0.5) * side + gauss(r) * 0.03
      o[1] = c[1] + (((r() * 5) | 0) / 4 - 0.5) * side + gauss(r) * 0.03
      o[2] = c[2] + (((r() * 5) | 0) / 4 - 0.5) * side + gauss(r) * 0.03
    } else {
      const k = (r() * 3) | 0
      edge(centers[k], centers[(k + 1) % 3], r, o, 0.04)
    }
  })
}

/* 4 — Bloch sphere with state vector and orbits (quantum) */
function quantum(n, r) {
  const R = 4.2
  const len = Math.hypot(0.6, 0.55, 0.58)
  const v = [(0.6 / len) * R, (0.55 / len) * R, (0.58 / len) * R]
  const d = [0, 0, 0]
  return fill(n, 0.2, (i, o) => {
    const q = r()
    if (q < 0.38) {
      randDir(r, d)
      o[0] = d[0] * R
      o[1] = d[1] * R
      o[2] = d[2] * R
    } else if (q < 0.66) {
      const axis = (r() * 3) | 0
      const a = r() * TAU
      const c = Math.cos(a) * R
      const s = Math.sin(a) * R
      if (axis === 0) { o[0] = 0; o[1] = c; o[2] = s }
      else if (axis === 1) { o[0] = c; o[1] = 0; o[2] = s }
      else { o[0] = c; o[1] = s; o[2] = 0 }
      o[0] += gauss(r) * 0.03
      o[1] += gauss(r) * 0.03
      o[2] += gauss(r) * 0.03
    } else if (q < 0.78) {
      const t = r()
      o[0] = v[0] * t + gauss(r) * 0.03
      o[1] = v[1] * t + gauss(r) * 0.03
      o[2] = v[2] * t + gauss(r) * 0.03
    } else if (q < 0.82) {
      blob(v, 0.2, r, o)
    } else {
      const a = r() * TAU
      const th = r() < 0.5 ? 0.7 : -0.7
      const x = Math.cos(a) * 5.6
      const y = Math.sin(a) * 3.0
      o[0] = x * Math.cos(th) - y * Math.sin(th) + gauss(r) * 0.03
      o[1] = x * Math.sin(th) + y * Math.cos(th) + gauss(r) * 0.03
      o[2] = gauss(r) * 0.05
    }
  })
}

/* 5 — Real Earth: continents sampled from Natural Earth land data, real cloud-region
       sites and great-circle arcs between them (forward deployed, anywhere) */

// Rasterise the land polygons once into an equirectangular mask we can sample.
let landMask = null
const MASK_W = 1024
const MASK_H = 512
function getLandMask() {
  if (landMask) return landMask
  const cv = document.createElement('canvas')
  cv.width = MASK_W
  cv.height = MASK_H
  const ctx = cv.getContext('2d', { willReadFrequently: true })
  ctx.fillStyle = '#fff'
  const land = feature(landTopo, landTopo.objects.land)
  const geoms = land.type === 'FeatureCollection' ? land.features.map((f) => f.geometry) : [land.geometry]
  ctx.beginPath()
  for (const g of geoms) {
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates
    for (const poly of polys) {
      for (const ring of poly) {
        ring.forEach(([lon, lat], i) => {
          const x = ((lon + 180) / 360) * MASK_W
          const y = ((90 - lat) / 180) * MASK_H
          if (i) ctx.lineTo(x, y)
          else ctx.moveTo(x, y)
        })
        ctx.closePath()
      }
    }
  }
  ctx.fill('evenodd')
  landMask = ctx.getImageData(0, 0, MASK_W, MASK_H).data
  return landMask
}

const DEG = Math.PI / 180
// lat/lon (degrees) -> unit vector; lon 0 faces +Z, +Y is north.
function ll2v(lat, lon, out) {
  const la = lat * DEG
  const lo = lon * DEG
  out[0] = Math.cos(la) * Math.sin(lo)
  out[1] = Math.sin(la)
  out[2] = Math.cos(la) * Math.cos(lo)
  return out
}

// Hyperscaler + edge regions (lat, lon) the globe lights up.
const REGIONS = [
  [38.9, -77.0],   // N. Virginia
  [45.6, -122.6],  // Oregon
  [41.3, -95.9],   // Iowa
  [53.3, -6.3],    // Dublin
  [50.1, 8.7],     // Frankfurt
  [51.5, -0.1],    // London
  [19.1, 72.9],    // Mumbai
  [17.4, 78.5],    // Hyderabad
  [1.35, 103.8],   // Singapore
  [35.7, 139.7],   // Tokyo
  [-33.9, 151.2],  // Sydney
  [-23.5, -46.6],  // São Paulo
  [25.2, 55.3],    // UAE
  [-26.2, 28.0],   // Johannesburg
]

function globe(n, r) {
  const R = 3.6
  const mask = getLandMask()
  const sites = REGIONS.map(([la, lo]) => ll2v(la, lo, [0, 0, 0]))
  const d = [0, 0, 0]
  const a = [0, 0, 0]
  return fill(n, 0.38, (i, o) => {
    const q = r()
    if (q < 0.64) {
      // continents: rejection-sample the sphere against the land mask
      let lat = 0
      let lon = 0
      for (let k = 0; k < 48; k++) {
        lat = Math.asin(r() * 2 - 1) / DEG
        lon = (r() * 2 - 1) * 180
        const px = Math.min(MASK_W - 1, ((lon + 180) / 360 * MASK_W) | 0)
        const py = Math.min(MASK_H - 1, ((90 - lat) / 180 * MASK_H) | 0)
        if (mask[(py * MASK_W + px) * 4] > 127) break
      }
      ll2v(lat, lon, d)
      const rr = R * (1 + gauss(r) * 0.004)
      o[0] = d[0] * rr
      o[1] = d[1] * rr
      o[2] = d[2] * rr
    } else if (q < 0.7) {
      // faint atmosphere shell
      randDir(r, d)
      o[0] = d[0] * R * 1.1
      o[1] = d[1] * R * 1.1
      o[2] = d[2] * R * 1.1
    } else if (q < 0.79) {
      // glowing region beacons
      const s = sites[(r() * sites.length) | 0]
      blob([s[0] * R * 1.01, s[1] * R * 1.01, s[2] * R * 1.01], 0.07, r, o)
    } else {
      // great-circle arcs lifted off the surface between nearby regions
      const ia = (r() * sites.length) | 0
      const ib = (ia + 1 + ((r() * 3) | 0)) % sites.length
      const A = sites[ia]
      const B = sites[ib]
      const t = r()
      a[0] = A[0] + (B[0] - A[0]) * t
      a[1] = A[1] + (B[1] - A[1]) * t
      a[2] = A[2] + (B[2] - A[2]) * t
      const l = Math.hypot(a[0], a[1], a[2]) || 1
      const chord = Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2])
      const h = R * 1.01 + Math.sin(Math.PI * t) * (0.4 + chord * 0.9)
      o[0] = (a[0] / l) * h + gauss(r) * 0.012
      o[1] = (a[1] / l) * h + gauss(r) * 0.012
      o[2] = (a[2] / l) * h + gauss(r) * 0.012
    }
  })
}

/* 6 — (2,3) torus knot: calm closing shape for projects / contact */
function knot(n, r) {
  return fill(n, 0.2, (i, o) => {
    const t = r() * TAU
    const rr = 2 + Math.cos(3 * t)
    const halo = r() < 0.15 ? 0.9 : 0.12
    o[0] = rr * Math.cos(2 * t) * 1.55 + gauss(r) * halo
    o[1] = rr * Math.sin(2 * t) * 1.55 + gauss(r) * halo
    o[2] = Math.sin(3 * t) * 1.55 + gauss(r) * halo
  })
}

// side: +1 shape on the right, -1 on the left, 0 centred. palette: [accent, secondary].
export const STAGES = [
  { name: 'galaxy', build: galaxy, side: 1, palette: ['#7dd3fc', '#c4b5fd'] },
  { name: 'network', build: network, side: 1, palette: ['#38bdf8', '#818cf8'] },
  { name: 'agents', build: agents, side: -1, palette: ['#34d399', '#38bdf8'] },
  { name: 'cloud', build: cloud, side: 1, palette: ['#fbbf24', '#fb7185'] },
  { name: 'quantum', build: quantum, side: -1, palette: ['#c084fc', '#22d3ee'] },
  { name: 'globe', label: 'Earth · deploy anywhere', build: globe, side: 1, palette: ['#60a5fa', '#34d399'] },
  { name: 'knot', build: knot, side: 0, opacity: 0.5, scale: 1.3, palette: ['#e2e8f0', '#7dd3fc'] },
]

export function buildStages(count) {
  return STAGES.map((s, i) => s.build(count, rng(1000 + i * 77)))
}
