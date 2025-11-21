import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      '/authorize': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      '/oauth2callback': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
})
