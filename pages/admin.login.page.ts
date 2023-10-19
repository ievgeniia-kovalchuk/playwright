import { expect, type Locator, type Page } from '@playwright/test';

export class AdminLoginPage {
  readonly page: Page;
  readonly adminLoginLink: Locator;
  readonly adminLoginHeader: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly loginState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminLoginLink = page.locator('#navadminlogin', {hasText: 'Admin Login'});
    this.adminLoginHeader = page.locator('h1', {hasText: 'Admin Login'});
    this.username = page.getByPlaceholder('Enter Username');
    this.password = page.getByPlaceholder('Enter Password');
    this.loginButton = page.locator('#login', {hasText: 'Login'});
  }

  async goto() {
    await this.page.goto('simpletodolist/todolists.html');
    await this.adminLoginLink.click();
  }

  async login(username: string, password: string) {


    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}