import { test, expect } from '@playwright/test';

test.describe('ナビゲーションのテスト', () => {
  test('ホームページからAboutページに移動できること', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('main-heading')).toContainText('Next.js + Vitestへようこそ');

    await page.getByRole('link', { name: 'About' }).click();

    await expect(page).toHaveURL('/about');
    await expect(page.getByTestId('about-heading')).toContainText('プロジェクトについて');
  });

  test('ホームページからお問い合わせページに移動できること', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'お問い合わせ' }).click();

    await expect(page).toHaveURL('/contact');
    await expect(page.getByTestId('contact-heading')).toContainText('お問い合わせ');
  });

  test('すべてのページでヘッダーとフッターが表示されること', async ({ page }) => {
    const pages = ['/', '/about', '/contact'];

    for (const url of pages) {
      await page.goto(url);
      
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('header')).toContainText('Next.jsサンプル');
      
      await expect(page.getByRole('link', { name: 'ホーム' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'お問い合わせ' })).toBeVisible();
      
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('footer')).toContainText('© 2025');
    }
  });
});
