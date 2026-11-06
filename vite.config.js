import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes asset URLs relative, so the same build works at a domain root (Netlify)
// and under a sub-path (GitHub Pages: /rohith-portfolio/).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
