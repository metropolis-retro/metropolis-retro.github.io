import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/games/pacman/',
  build: {
    outDir: path.resolve(__dirname, '../../public/games/pacman'),
    emptyOutDir: true,
  },
})
