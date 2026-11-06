# 3D AI Portfolio

A full-bleed 3D portfolio for an AI researcher / engineer, built with **React**, **Vite**, **React Three Fiber**
and **postprocessing** (bloom). A fixed WebGL stage shows a different meshed set-piece for each section (an
iridescent shader core, a transformer stack, an agent hub, a GPU cluster, a Bloch sphere, Earth with cloud
regions, a commit graph, an iridescent knot), the research chapters are pinned while the stage morphs, and the
flagship systems scroll horizontally with a live 3D preview inside every card.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Fill in your details (the only required step)

Edit **`src/data/profile.js`**:

- `name` — your name (also drives the giant hero title, nav and page title)
- `email` — your email
- `cv` — link to your CV (drop `cv.pdf` into `public/` and use `/cv.pdf`, or any URL)
- optional: `location`, `socials` (empty links are hidden)

## Change the copy

Everything else the site says lives in **`src/data/content.js`**: hero, the manifesto (wrap words in
`**stars**` to highlight them), the five pinned chapters, the multi-cloud matrix, the six flagship systems
(add `code` / `demo` / `paper` URLs to show links), open-source areas and the contact text.

## Structure

```
src/
  data/profile.js      ← name / email / CV (edit this)
  data/content.js      ← all copy
  three/Scene.jsx      ← fixed WebGL stage: camera rig, lights, dust, bloom, stage pieces
  three/Preview.jsx    ← small per-card canvas for the project gallery
  three/pieces/        ← the 3D set-pieces (core, network, agents, cluster, quantum, globe, gates, upstream, knot)
  three/land.js        ← Natural Earth land mask for the globe
  ui/                  ← one component per section
  lib/                 ← Lenis smooth scroll, shared scroll state, pin progress, hover tilt
```

Sections: Hero · Band · Manifesto · Chapters (pinned: Models, Agents, Infra, Quantum, Forward deployed) ·
Cloud matrix · Systems (horizontal gallery) · Open source · Contact.

A section picks the stage piece behind it with `data-stage="<piece key>"` (and `data-side="1|-1"`).
The chapters rewrite their own `data-stage` as you scroll through them.

## Theme

Colours, fonts and spacing are CSS variables at the top of `src/index.css`. Fonts: Syne (display), Manrope
(body), JetBrains Mono (labels). The 3D palette lives in `src/three/pieces/shared.jsx`.

## Deploy

`dist/` is a static site. Deploy to Vercel, Netlify, Cloudflare Pages or GitHub Pages with build command
`npm run build` and output directory `dist`.
