import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setuptests.jsx',
    include: ['src/tests/**/*.test.jsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/tests/**',
        'dist/**',
        'api/**', 
        'vite.config.js',
        'eslint.config.js',
        '**/__mocks__/**',
      ],
    },
  },
});
