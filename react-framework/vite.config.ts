import * as path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import mkcert from 'vite-plugin-mkcert';

const BASE_URL = '/playground/hosting/no-backend';

// https://vitejs.dev/config/
export default defineConfig({
  base: `${BASE_URL ?? ''}/`,
  server: { https: true },
  plugins: [
    mkcert(),
    react(),
    !process.env.VITEST
      ? checker({
          typescript: true,
        })
      : undefined,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
