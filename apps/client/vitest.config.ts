import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      reporters: ['default'],

      exclude: ['node_modules', 'tests/E2E/**', 'tests/unit/lib_tests/**'],

      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        reportsDirectory: './coverage',
        include: ['tests/unit/**/*.test.ts'],
        exclude: ['node_modules/', 'tests/E2E/**', 'tests/unit/lib_tests/**'],
      },
    },
  })
);
