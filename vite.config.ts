import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output to 'dist' folder
    outDir: 'dist',
    // Ensure assets use relative paths so they work inside wp-content/plugins/
    base: './', 
    rollupOptions: {
      output: {
        // Force consistent filenames so our PHP file knows what to load
        entryFileNames: 'assets/index.js',
        assetFileNames: 'assets/index.css',
        chunkFileNames: 'assets/[name].js',
      },
    },
  },
});