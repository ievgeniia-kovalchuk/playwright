import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('simpletodolist/adminlogin.html');
  await expect(page.locator('#eviltester')).toBeVisible();
  await page.locator('#eviltester').click();
  await expect(page.locator('.new-todo')).toBeVisible();
});
