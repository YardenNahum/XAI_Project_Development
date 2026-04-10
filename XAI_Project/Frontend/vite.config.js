import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist', // output directory for the build
    emptyOutDir: true, // clear the output directory before building
  },
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
  },
  proxy: {
    '/backend': { // proxy api requests to the server
    target: 'http://localhost:3000/', //  target server
    changeOrigin: true,
    },
  },

})