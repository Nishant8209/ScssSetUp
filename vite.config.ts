import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'Microfrontend',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        
      },
    },
    cssCodeSplit: true, // Enable CSS code splitting
  },
 
});