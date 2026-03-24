import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
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
    assetsInlineLimit: 4096,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // Better image handling
    emptyOutDir: true,
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600',
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
        '**/.env.local',
      ]
    },
    hmr: false
  }
})
