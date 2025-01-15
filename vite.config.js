// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   server: {
//     port: 9999, // מספר הפורט החדש
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 9999,
    proxy: {
      '/api': {
        target: 'https://buy-wise.onrender.com',
        changeOrigin: true,
      }
    }
  },
})