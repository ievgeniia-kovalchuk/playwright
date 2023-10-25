import { expect, type Locator, type Page } from '@playwright/test'

export class AdminTodolistPage {
  readonly page: Page
  readonly pageHeader: Locator
  readonly newTodo: Locator
  readonly todoListToggles: Locator
  readonly todoCount: Locator
  readonly toggleAll: Locator
  readonly untoggleAll: Locator
  readonly todoList: Locator

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('header h1')
    this.newTodo = page.getByPlaceholder('Enter new todo text here')
    this.todoListToggles = page.locator('//ul//input')
    this.todoCount = page.locator('.todo-count strong')
    this.toggleAll = page.locator('#toggle-all')
    this.untoggleAll = page.locator('.clear-completed')
    this.todoList = page.locator('.todo-list')
  }

  async goto() {
    await this.page.goto('/simpletodolist/todo.html#/&eviltester')
    await expect(this.pageHeader).toHaveText('TODOs : eviltester')
  }

  async addNewTodo(todo: string)
  {
    await this.newTodo.fill(todo)
    await this.page.keyboard.press('Enter')
    await this.todoList.getByText(todo).waitFor({state:'visible'});
  }

  async fillTodolist(items : string[])
  {
    for (const item of items){
        await this.addNewTodo(item);
    }
  }

  async markAllAsComplete()
  {
    await expect(this.toggleAll).not.toBeChecked()
    await this.toggleAll.check()
    
    await this.todoList.first().waitFor()
    let count = await this.todoList.getByRole('checkbox').count()
    for (let i = 0; i < count; i++) {
      await expect(this.todoList.getByRole('checkbox').nth(i)).toBeChecked()
    }
  }
}