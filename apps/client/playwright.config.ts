import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests/E2E',
  timeout: 60 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  retries: 2,
  workers: '100%',
  use: {
    baseURL:
      process.env['ENV_MODE'] === 'test'
        ? process.env['FRONT_URL_TEST']
        : process.env['FRONT_URL_DEV'],
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  reporter: [['html', { open: 'never' }]],
  testMatch: ['**/*.test.ts'],

  projects: [
    // { name: "chromium", use: { browserName: "chromium" } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
});
