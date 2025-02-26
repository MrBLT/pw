import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://example.com/');
  await expect(page.getByRole('heading')).toContainText('Example Domain');
  await page.getByRole('link', { name: 'More information...' }).click();
  await expect(page.locator('h2')).toContainText('Further Reading');
});