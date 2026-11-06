import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development, /api and /uploads are forwarded to the Express server on port 5000.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: { manualChunks: { three: ['three'], vendor: ['react', 'react-dom', 'react-router-dom', 'react-bootstrap'] } }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000'
    }
  },
  css: { preprocessorOptions: { scss: { quietDeps: true, silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'] } } }
});
