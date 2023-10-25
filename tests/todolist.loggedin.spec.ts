import { test, expect } from '@playwright/test'
import { AdminTodolistPage } from '../pages/admin.todolist.page'

let adminTodolistPage

test.beforeEach(async ({page}) => {
  adminTodolistPage = new AdminTodolistPage(page)
  adminTodolistPage.goto()
});

test.describe('admin todo - no initial data', () => {

  test('admin todolist - add items', async () => {
    await adminTodolistPage.addNewTodo('test item 1')
    await expect(adminTodolistPage.todoList).toHaveText(['test item 1'])
    await expect(adminTodolistPage.todoCount).toHaveText('1')
    await adminTodolistPage.addNewTodo('test item 2')
    await expect(adminTodolistPage.todoList).toContainText(['test item 2'])
    await expect(adminTodolistPage.todoCount).toHaveText('2')
  })
})

test.describe('admin todo - fill in data', () =>
{
  test.beforeEach(async () => {
    await adminTodolistPage.fillTodolist(['item1', 'item2', 'item3'])
  });

  test('mark all as complete', async () => {
    await adminTodolistPage.markAllAsComplete()
    await expect(adminTodolistPage.todoCount).toHaveText('0')
  });
});
