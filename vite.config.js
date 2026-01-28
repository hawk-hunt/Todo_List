import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward all /api requests to backend on port 5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // Remove /api prefix when forwarding to backend
        // So /api/auth/login becomes /api/auth/login on backend
        rewrite: (path) => path,
      }
    }
  }
})
