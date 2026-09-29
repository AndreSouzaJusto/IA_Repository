import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries:  0,
  reporter: 'html',
  use: {
    baseURL: 'https://erickwendel.github.io/vanilla-js-web-app-example/',
    trace: 'on-first-retry',
  },
  timeout: 5000,
  expect: {
    timeout: 5000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
