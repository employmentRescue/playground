import * as path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    !process.env.VITEST ?
  checker({
    typescript: true,
  }) : undefined],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    }
  }
})
