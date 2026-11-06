// Mutable state shared between the DOM layer and the WebGL layer.
// Plain objects on purpose: read inside requestAnimationFrame, no React re-renders.
export const scrollState = {
  y: 0,
  progress: 0, // 0..1 over the whole page
  vel: 0, // scroll velocity (px/frame-ish)
  stage: 'core', // which 3D piece the main stage shows (from [data-stage] of the section at mid-viewport)
  side: 1, // +1 piece on the right of the text, -1 on the left
}

// Pointer in normalised device coords (-1..1), tracked on window so the canvas can stay pointer-events: none.
export const pointerState = { x: 0, y: 0, active: false }
