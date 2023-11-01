import { expect, type Locator, type Page } from '@playwright/test'

export class AdminLoginPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Enter Username').fill(username)
    await this.page.getByPlaceholder('Enter Password').fill(password)
    await this.page.locator('#login', {hasText: 'Login'}).click()

    // Wait until page is loaded after login
    await expect(this.page.getByText('Admin View')).toBeVisible()
  }
}