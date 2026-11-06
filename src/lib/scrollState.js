// Mutable scroll state shared between the DOM layer and the WebGL layer.
// Plain object on purpose: read inside requestAnimationFrame, no React re-renders.
export const scrollState = {
  y: 0,
  progress: 0, // 0..1 over the whole page
  vel: 0, // scroll velocity (px/frame-ish), used for a subtle spin kick
  stage: 0, // index into STAGES (src/three/stages.js), set from [data-stage] sections
}
