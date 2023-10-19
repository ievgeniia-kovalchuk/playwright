import { test as setup, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/admin.login.page';
import { STORAGE_STATE } from '../playwright.config';

setup('do login', async ({ page }) => {

  const adminLoginPage = new AdminLoginPage(page);

  await adminLoginPage.goto();
  await expect(adminLoginPage.adminLoginHeader).toBeVisible();

  await adminLoginPage.login('Admin', 'AdminPass');
  // Wait until page is loaded after login
  await expect(page.getByText('Admin View')).toBeVisible();

  await page.context().storageState({ path: STORAGE_STATE });
});