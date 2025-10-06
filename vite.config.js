import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simula un entorno de navegador para poder probar componentes React
    globals: true,        // Permite usar funciones como test(), expect(), etc. sin importarlas en cada archivo
    setupFiles: './src/setupTests.ts', // Archivo donde puedes configurar cosas globales para tus tests (como jest-dom)
    coverage: {
      provider: 'v8',          // Usa el motor de cobertura de código de V8 (gracias a @vitest/coverage-v8)
      reportsDirectory: './coverage', // Carpeta donde se guardarán los reportes de cobertura
    },
  },
})
