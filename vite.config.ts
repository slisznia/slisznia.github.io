import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Base path: '/' for both dev and prod. The site is served at the user-site
// root https://slisznia.github.io/ (repo name: slisznia.github.io). If you
// move it back under a subpath, set the build-mode base to '/<subpath>/'.
export default defineConfig(() => ({
  base: '/',
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
