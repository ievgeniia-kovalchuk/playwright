import { expect, type Locator, type Page } from '@playwright/test';

export class TodolistPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly newTodolist: Locator;
  readonly todolistsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('header h1');
    this.newTodolist = page.locator('.new-todo-list');
    this.todolistsList = page.locator('//ul//label');
  }

  async goto() {
    await this.page.goto('simpletodolist/todolists.html');
    await expect(this.pageHeader).toHaveText('todos List Management');
  }

  async addNewTodolist(name)
  {
    await this.newTodolist.fill(name);
    await this.page.keyboard.press('Enter');
    await expect((await this.todolistsList.allInnerTexts()).includes(name)).toBeTruthy();
  }

  async openTodolist(name)
  {
    await this.page.locator(`//ul//div[contains(.,\'${name}\')]/a`).click();
  }
}