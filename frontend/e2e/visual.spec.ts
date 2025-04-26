// import { test, expect } from '@playwright/test';

// test.describe('ビジュアルテスト', () => {
//   test('各ページのスクリーンショットを撮影する', async ({ page }) => {
//     await page.goto('/');

//     await page.waitForTimeout(1000);

//     await expect(page).toHaveScreenshot('home-page.png', {
//       fullPage: true,
//       mask: [page.locator('footer')], // 日付など動的な部分をマスク
//       threshold: 0.2, // 最大20%の差異を許容
//     });

//     await page.goto('/about');

//     await page.waitForTimeout(1000);

//     await expect(page).toHaveScreenshot('about-page.png', {
//       fullPage: false,
//       mask: [page.locator('footer')],
//       threshold: 0.2,
//     });

//     await page.goto('/contact');

//     await page.waitForTimeout(1000);

//     await expect(page).toHaveScreenshot('contact-page.png', {
//       fullPage: true,
//       mask: [page.locator('footer')],
//       threshold: 0.2,
//     });
//   });

//   test('コンタクトフォームの各状態のスクリーンショットを撮影する', async ({ page }) => {
//     await page.goto('/contact');

//     await expect(page.getByTestId('contact-form')).toHaveScreenshot('contact-form-initial.png');

//     await page.getByTestId('submit-button').click();
//     await expect(page.getByTestId('contact-form')).toHaveScreenshot('contact-form-errors.png');

//     await page.getByTestId('name-input').fill('テスト太郎');
//     await page.getByTestId('email-input').fill('test@example.com');
//     await page.getByTestId('message-input').fill('これはテストメッセージです。');
//     await expect(page.getByTestId('contact-form')).toHaveScreenshot('contact-form-filled.png');

//     await page.getByTestId('submit-button').click();
//     await expect(page.getByTestId('success-message')).toHaveScreenshot('contact-form-success.png');
//   });

//   test('レスポンシブなレイアウトのスクリーンショットを撮影する', async ({ page }) => {
//     await page.setViewportSize({ width: 1280, height: 800 });
//     await page.goto('/');
//     await expect(page).toHaveScreenshot('home-desktop.png', {
//       fullPage: false,
//     });

//     await page.setViewportSize({ width: 768, height: 1024 });
//     await page.goto('/');
//     await expect(page).toHaveScreenshot('home-tablet.png', {
//       fullPage: false,
//     });

//     await page.setViewportSize({ width: 375, height: 667 });
//     await page.goto('/');
//     await expect(page).toHaveScreenshot('home-mobile.png', {
//       fullPage: false,
//     });
//   });
// });