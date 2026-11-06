# Rohith Kantipudi — 3D AI Portfolio

A futuristic, AI-themed portfolio built with **React**, **Vite**, and **React Three Fiber** (Three.js). Features an interactive 3D background — a glowing particle field, an animated neural network, floating morphing geometry, and a mouse/scroll-reactive camera — over glassmorphism UI.

## Quick start

```bash
npm install      # install dependencies (already done)
npm run dev      # start dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Customize (the important part)

**All your content lives in one file:** `src/data/content.js`

Edit it to change:
- `profile` — your name, role, taglines, email, resume link, social links
- `about` — your bio paragraphs and the stat tiles
- `skills` — skill groups and the technologies in each
- `projects` — your featured projects (title, blurb, tags, links)
- `experience` — your work timeline
- `contact` — the contact section text

No component code needs to change — just edit that file.

### Theme colors
Tweak the neon palette in `src/index.css` under `:root` (`--cyan`, `--purple`, `--grad`, etc.).

### 3D scene
The background lives in `src/components/three/`:
- `ParticleField.jsx` — the drifting star cloud
- `NeuralNetwork.jsx` — glowing connected nodes
- `FloatingShapes.jsx` — morphing wireframe solids
- `Scene.jsx` — canvas setup + mouse/scroll camera rig

## Deploy

The `dist/` folder is a static site — deploy it to **Vercel**, **Netlify**, **GitHub Pages**, or **Cloudflare Pages**. For Vercel/Netlify: build command `npm run build`, output directory `dist`.

## Tech stack

React 18 · Vite · React Three Fiber · @react-three/drei · Three.js · Framer Motion
