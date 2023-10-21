import { expect, type Locator, type Page } from '@playwright/test';

export class AdminTodolistPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly newTodo: Locator;
  readonly todoListText: Locator;
  readonly todoListToggles: Locator; 
  readonly todoCount: Locator;
  readonly toggleAll: Locator;
  readonly untoggleAll: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('header h1');
    this.newTodo = page.getByPlaceholder('Enter new todo text here');
    this.todoListText = page.locator('//ul//label');
    this.todoListToggles = page.locator('//ul//input');
    this.todoCount = page.locator('.todo-count strong');
    this.toggleAll = page.locator('#toggle-all');
    this.untoggleAll = page.locator('.clear-completed');
  }

  async goto() {
    await this.page.goto('/simpletodolist/todo.html#/&eviltester');
    await expect(this.pageHeader).toHaveText('TODOs : eviltester');
  }

  async addNewTodo(todo: string)
  {
    await this.newTodo.fill(todo); 
    await this.page.keyboard.press('Enter');
  }

  async fillTodolist(items : string[])
  {
    for (const item of items){
        await this.addNewTodo(item);
    }
    await expect(this.todoListText).toContainText(items);
  }

  async markAllAsComplete()
  {
    await expect(this.toggleAll).not.toBeChecked();
    await this.toggleAll.check();

    for (const element of await this.todoListToggles.all())
    {
        await expect(element).toBeChecked();
    }
  }
}