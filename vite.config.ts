import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Set base path: '/' for root domain, '/subfolder' for subdirectory hosting
  // Can be overridden with VITE_BASE_PATH environment variable
  base: mode === 'production' ? '/' : '/ConvertX-11-1',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
}));
