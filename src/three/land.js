// Natural Earth land polygons rasterised once into an equirectangular mask, so the globe
// can scatter points on real continents.
import landTopo from 'world-atlas/land-110m.json'
import { feature } from 'topojson-client'

const MASK_W = 1024
const MASK_H = 512
let landMask = null

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

/** lat/lon (degrees) -> unit vector; lon 0 faces +Z, +Y is north. */
export function ll2v(lat, lon, out = [0, 0, 0]) {
  const la = lat * DEG
  const lo = lon * DEG
  out[0] = Math.cos(la) * Math.sin(lo)
  out[1] = Math.sin(la)
  out[2] = Math.cos(la) * Math.cos(lo)
  return out
}

/** Hyperscaler + edge regions (lat, lon) the globe lights up. */
export const REGIONS = [
  [38.9, -77.0], [45.6, -122.6], [41.3, -95.9], [53.3, -6.3], [50.1, 8.7], [51.5, -0.1], [19.1, 72.9],
  [17.4, 78.5], [1.35, 103.8], [35.7, 139.7], [-33.9, 151.2], [-23.5, -46.6], [25.2, 55.3], [-26.2, 28.0],
]

// Small seeded RNG so the point layout is identical on every load.
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

/** n points on a sphere of radius R that fall on land. Returns Float32Array(n*3). */
export function landPoints(n, R) {
  const mask = getLandMask()
  const r = rng(7)
  const out = new Float32Array(n * 3)
  const d = [0, 0, 0]
  for (let i = 0; i < n; i++) {
    let lat = 0
    let lon = 0
    for (let k = 0; k < 64; k++) {
      lat = Math.asin(r() * 2 - 1) / DEG
      lon = (r() * 2 - 1) * 180
      const px = Math.min(MASK_W - 1, (((lon + 180) / 360) * MASK_W) | 0)
      const py = Math.min(MASK_H - 1, (((90 - lat) / 180) * MASK_H) | 0)
      if (mask[(py * MASK_W + px) * 4] > 127) break
    }
    ll2v(lat, lon, d)
    out[i * 3] = d[0] * R
    out[i * 3 + 1] = d[1] * R
    out[i * 3 + 2] = d[2] * R
  }
  return out
}
