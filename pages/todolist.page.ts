import { expect, type Locator, type Page } from '@playwright/test'

export class TodolistPage {
  readonly page: Page
  readonly pageHeader: Locator
  readonly newTodolist: Locator
  readonly todolistsList: Locator
  readonly listItems: Locator

  constructor(page: Page) {
    this.page = page
    this.pageHeader = page.locator('header h1')
    this.newTodolist = page.locator('.new-todo-list')
    this.todolistsList = page.locator('//ul//label')
    this.listItems = page.getByRole('listitem')
  }

  async goto() {
    await this.page.goto('simpletodolist/todolists.html')
    await expect(this.pageHeader).toHaveText('todos List Management')
  }

  async getAllTodolistNames(): Promise<string[]>
  {
    const todolistNames: Array<string> = []
    for (const item of await this.listItems.all())
    {
      const name = await item.locator('label').textContent() ?? ""
      todolistNames.push(name)
    }
    return todolistNames
  }

  async addNewTodolist(name)
  {
    await this.newTodolist.fill(name)
    await this.page.keyboard.press('Enter')
    await expect((await this.todolistsList.allInnerTexts()).includes(name)).toBeTruthy()
  }

  async openTodolist(name)
  {
    await this.page.locator(`//ul//div[contains(.,\'${name}\')]/a`).click()
    await expect(this.pageHeader).toHaveText(`TODOs : ${name}`)
  }
}