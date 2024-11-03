import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/DietApp/',
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'DietApp-logo.png') {
            return 'DietApp-logo.png'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  publicDir: 'public'
})