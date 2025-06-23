import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  define: {
    'process.env': {},
    global: 'window',
  },
  server: {
    https: false,
    proxy: {
      '/api': {
        target: 'https://152.42.134.22:5000',
        changeOrigin: true,
        secure: false, // Accept self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});