import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/https://iptv-react-sand.vercel.app/',
  build: {
    outDir: 'dist',
  }
})
