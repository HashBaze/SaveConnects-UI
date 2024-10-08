import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
   port: 8080,
   strictPort: true,
  }
});
