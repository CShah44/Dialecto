import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://dialecto.onrender.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   },
  //   // host: '0.0.0.0', // Allows access from other devices on the same network
  //   // port: 5173,      // Sets a fixed port to prevent random assignment
  // }
  port: 5173,
})
