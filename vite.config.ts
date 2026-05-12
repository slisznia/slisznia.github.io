import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Base path: '/' in dev (so http://localhost:5173/ works), '/bio/' in prod
// (so the site loads correctly at https://slisznia.github.io/bio/). If you
// later point a custom domain at the GitHub Pages site, change the build-mode
// base back to '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/bio/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@data': fileURLToPath(new URL('./data', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
}))
