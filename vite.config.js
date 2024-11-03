import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  base: '/DietApp/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Chunk per React e React DOM
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }
          
          // Chunk per Radix UI
          if (id.includes('@radix-ui/')) {
            return 'vendor-radix'
          }
          
          // Chunk per Lucide icons
          if (id.includes('lucide-react')) {
            return 'vendor-icons'
          }
          
          // Chunk per utility libraries
          if (id.includes('papaparse') || 
              id.includes('file-saver') || 
              id.includes('xlsx')) {
            return 'vendor-utils'
          }

          // Chunk per componenti principali
          if (id.includes('/src/components/')) {
            return 'components'
          }

          // Chunk per utilities
          if (id.includes('/src/utils/')) {
            return 'utils'
          }
        },
        // Configurazione dei nomi dei file di output
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'DietApp-logo.png') {
            return 'DietApp-logo.png'
          }
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    // Ottimizzazione aggressiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      }
    },
    // Compressione delle immagini
    assetsInlineLimit: 4096, // 4kb
  },
  // Ottimizzazione delle dipendenze
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      '@radix-ui/react-slot',
      'lucide-react',
      'papaparse'
    ]
  }
})