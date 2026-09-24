import { defineConfig, devices } from '@playwright/test';

// Smoke tests against the built site (`npm run build` first).
// `*.e2e.ts` keeps these out of Vitest's default `*.test.ts` glob.
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4321/SharpHire/',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run preview -- --port 4321',
    url: 'http://localhost:4321/SharpHire/',
    reuseExistingServer: !process.env.CI,
  },
});
