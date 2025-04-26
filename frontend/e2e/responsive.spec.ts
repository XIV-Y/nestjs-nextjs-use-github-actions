import { test, expect } from '@playwright/test';

test.describe('レスポンシブデザインのテスト', () => {
  test('デスクトップとモバイルでページが正しく表示されること', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByTestId('main-heading')).toBeVisible();
    await expect(page.locator('.grid')).toBeVisible();
    
    await page.setViewportSize({ width: 375, height: 667 }); // iPhoneサイズ
    
    await expect(page.getByTestId('main-heading')).toBeVisible();
    await expect(page.locator('.grid').locator('> *')).toHaveCount(2);
  });

  test('モバイルとデスクトップでContactページが正しく表示されること', async ({ page }) => {
    await page.goto('/contact');
    
    await expect(page.getByTestId('contact-form')).toBeVisible();
    
    const formWidth = await page.getByTestId('contact-form').evaluate(el => {
      return window.getComputedStyle(el).width;
    });
    
    await page.setViewportSize({ width: 375, height: 667 });

    const mobileFormWidth = await page.getByTestId('contact-form').evaluate(el => {
      return window.getComputedStyle(el).width;
    });

    const desktopWidthNumber = parseInt(formWidth.replace('px', ''));
    const mobileWidthNumber = parseInt(mobileFormWidth.replace('px', ''));

    expect(mobileWidthNumber).toBeLessThan(desktopWidthNumber);
    
    await expect(page.getByTestId('name-input')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('message-input')).toBeVisible();
  });
});