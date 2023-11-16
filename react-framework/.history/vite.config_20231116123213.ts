import * as path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  base: "${env.BASE_URL}/",
  server: { https: true },
  plugins: [
    mkcert(),
    react(),
    !process.env.VITEST ?
      checker({
        typescript: true,
      }) : undefined],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
