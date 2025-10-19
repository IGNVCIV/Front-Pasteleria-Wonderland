import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: './src/tests/setuptests.jsx',
  include: ['src/tests/**/*.test.jsx'], // 👈 Esto es lo que falta
  coverage: {
    provider: 'v8',
    reportsDirectory: './coverage',
  },
}

});
