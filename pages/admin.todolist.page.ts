import { expect, type Locator, type Page } from '@playwright/test'

export class AdminTodolistPage {
  readonly page: Page
  readonly pageHeader: Locator
  readonly newTodo: Locator
  readonly todoCount: Locator
  readonly completeAll: Locator
  readonly todoList: Locator
  readonly removeTodo: Locator

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('header h1')
    this.newTodo = page.getByPlaceholder('Enter new todo text here')
    this.todoCount = page.locator('.todo-count strong')
    this.completeAll = page.locator('#toggle-all')
    this.todoList = page.locator('.todo-list')
    this.removeTodo = page.locator('.destroy')
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
    await expect(this.completeAll).not.toBeChecked()
    await this.completeAll.check()
    
    await this.todoList.first().waitFor()
    let checkboxes = this.todoList.getByRole('checkbox')
    let count = await checkboxes.count()
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).toBeChecked()
    }
  }

  async removeItem(text: string)
  {
    await this.todoList.locator('.view', {hasText:text}).locator(this.removeTodo).click()
  }

  async completeItem(text: string)
  {
    await this.todoList.locator('.view', {hasText:text}).getByRole('checkbox').check()
  }

  async getTodoItems(): Promise<string[]>{
    let results = [""]

    await this.todoList.locator('.view').first().waitFor({state:'visible'})
    results = await this.todoList.locator('.view').allTextContents()

    return results
  }

  assertTodos(expectedTodos: string[], actualTodos: string[]): boolean
  {
    var expectedTodosSorted = expectedTodos.sort()
    var actualTodosSorted = actualTodos.sort()

    console.log("expected:\n"+expectedTodosSorted)
    console.log("actual:\n"+actualTodosSorted)
    var result = JSON.stringify(actualTodosSorted) === JSON.stringify(expectedTodosSorted)
    console.log("result: " + result)
    return result
  }
}