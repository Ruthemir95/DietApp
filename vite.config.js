import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://ruthemir95.github.io/DietApp/',
  build: {
    outDir: 'build'
  },
  publicDir: 'public',
})