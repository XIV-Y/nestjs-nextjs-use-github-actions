import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  /* テスト実行の最大時間（ms） */
  timeout: 30000,
  /* テスト実行の並列処理 */
  fullyParallel: true,
  /* テスト失敗時に再試行する回数 */
  retries: process.env.CI ? 2 : 0,
  /* テスト実行ごとに各テスターが実行するテスト数 */
  workers: process.env.CI ? 1 : undefined,
  /* テストレポーターの設定 */
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    /* すべてのテストでのトレースを取得 */
    trace: 'on-first-retry',
    /* スクリーンショットの設定 */
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    // {
    //   name: 'mobile-safari',
    //   use: { ...devices['iPhone 13'] },
    // },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
