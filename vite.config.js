import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize image import size warning threshold
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
        }
      }
    },
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600', // Cache images for 1 hour in dev
    },
    watch: {
      usePolling: false,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.vercel/**',
        '**/dist/**',
        '**/.vscode/**',
        '**/.idea/**',
        '**/.*',
      ]
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5175,
    }
  }
})
