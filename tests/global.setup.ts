import { test as setup } from '@playwright/test'
import { PageManager } from '../pages/page.manager'
import { STORAGE_STATE } from '../playwright.config'

setup('do login', async ({ page }) => {

  const pm = new PageManager(page)

  await pm.navigateTo().adminLoginPage()
  await pm.onAdminLoginPage().login('Admin', 'AdminPass')

  await page.context().storageState({ path: STORAGE_STATE })
});