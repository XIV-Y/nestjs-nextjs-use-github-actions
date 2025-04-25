
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8', // 'v8'または'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '.next/**',
        '**/*.d.ts',
        'test-utils.tsx',
        'vitest.setup.ts',
        'vite-env.d.ts'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
