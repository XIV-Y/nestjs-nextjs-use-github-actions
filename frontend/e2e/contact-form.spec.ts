import { test, expect } from '@playwright/test';

test.describe('お問い合わせフォームのテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('フォームが表示されていること', async ({ page }) => {
    await expect(page.getByTestId('contact-form')).toBeVisible();
    await expect(page.getByTestId('name-input')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('message-input')).toBeVisible();
    await expect(page.getByTestId('submit-button')).toBeVisible();
  });

  test('空のフォーム送信時にエラーが表示されること', async ({ page }) => {
    await page.getByTestId('submit-button').click();
    
    await expect(page.getByTestId('name-error')).toBeVisible();
    await expect(page.getByTestId('email-error')).toBeVisible();
    await expect(page.getByTestId('message-error')).toBeVisible();
  });

  test('不正な形式のメールアドレスでエラーが表示されること', async ({ page }) => {
    await page.getByTestId('name-input').fill('テスト太郎');
    await page.getByTestId('email-input').fill('invalid-email');
    await page.getByTestId('message-input').fill('これはテストメッセージです。');
    
    await page.getByTestId('submit-button').click();

    await expect(page.getByTestId('name-error')).not.toBeVisible();
    await expect(page.getByTestId('email-error')).toBeVisible();
    await expect(page.getByTestId('message-error')).not.toBeVisible();
  });

  test('クリアボタンでフォームがリセットされること', async ({ page }) => {
    await page.getByTestId('name-input').fill('テスト太郎');
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('message-input').fill('これはテストメッセージです。');
    
    await page.getByTestId('clear-button').click();

    await expect(page.getByTestId('name-input')).toHaveValue('');
    await expect(page.getByTestId('email-input')).toHaveValue('');
    await expect(page.getByTestId('message-input')).toHaveValue('');
  });

  test('有効なフォーム送信で成功メッセージが表示されること', async ({ page }) => {
    await page.getByTestId('name-input').fill('テスト太郎');
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('message-input').fill('これはテストメッセージです。');
    
    await page.getByTestId('submit-button').click();
    
    await expect(page.getByTestId('success-message')).toBeVisible();
    await expect(page.getByTestId('success-message')).toContainText('送信完了！');
    
    await expect(page.getByTestId('reset-button')).toBeVisible();
  });

  test('送信成功後にリセットボタンで新しいフォームを表示できること', async ({ page }) => {
    await page.getByTestId('name-input').fill('テスト太郎');
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('message-input').fill('これはテストメッセージです。');
    await page.getByTestId('submit-button').click();
    
    await expect(page.getByTestId('success-message')).toBeVisible();
    
    await page.getByTestId('reset-button').click();
    
    await expect(page.getByTestId('contact-form')).toBeVisible();
    await expect(page.getByTestId('name-input')).toHaveValue('');
  });
});
