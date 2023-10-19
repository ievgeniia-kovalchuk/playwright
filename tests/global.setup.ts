import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('do login', async ({ page }) => {
  await page.goto('simpletodolist/todolists.html');
  await page.locator('#navadminlogin').click();
  await page.getByPlaceholder('Enter Username').fill('Admin');
  await page.getByPlaceholder('Enter Password').fill('AdminPass');
  await page.locator('#login').click();

  // Wait until page is loaded after login
  await expect(page.getByText('Admin View')).toBeVisible();

  await page.context().storageState({ path: STORAGE_STATE });
});