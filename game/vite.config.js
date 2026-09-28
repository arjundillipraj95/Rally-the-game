import { defineConfig } from 'vite';
// Relative base so the built game works at https://<user>.github.io/Rally-the-game/
export default defineConfig({
  base: './',
  build: { outDir: 'dist', emptyOutDir: true, assetsDir: 'assets', chunkSizeWarningLimit: 1500, target: 'es2019' },
  server: { host: true },
});
