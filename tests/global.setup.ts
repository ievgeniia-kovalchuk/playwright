import { test as setup } from '@playwright/test'
import { AdminLoginPage } from '../pages/admin.login.page'
import { STORAGE_STATE } from '../playwright.config'

setup('do login', async ({ page }) => {

  const adminLoginPage = new AdminLoginPage(page)

  await adminLoginPage.goto()
  await adminLoginPage.login('Admin', 'AdminPass')

  await page.context().storageState({ path: STORAGE_STATE })
});