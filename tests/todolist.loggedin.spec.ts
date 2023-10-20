import { test, expect } from '@playwright/test';
import { AdminTodolistPage } from '../pages/admin.todolist.page';

test('admin todolist - navigate', async ({page}) => {
  await page.goto('simpletodolist/adminlogin.html');
  await expect(page.locator('#eviltester')).toBeVisible();

  await page.locator('#eviltester').click();
  await expect(page.locator('.new-todo')).toBeVisible();
});

test('admin todolist - add items', async ({ page }) => {
  const adminTodolistPage = new AdminTodolistPage(page);

  await adminTodolistPage.goto();
  await adminTodolistPage.addNewTodo('test item 1');
  await expect(adminTodolistPage.todoListText).toHaveText(['test item 1']);
  await expect(adminTodolistPage.todoCount).toHaveText('1');
  await adminTodolistPage.addNewTodo('test item 2');
  await expect(adminTodolistPage.todoListText).toHaveText(['test item 1', 'test item 2']);
  await expect(adminTodolistPage.todoCount).toHaveText('2');
});

test('admin todolist - mark all as compelete', async ({page}) => {
  const adminTodolistPage = new AdminTodolistPage(page);

  await adminTodolistPage.goto();
  await adminTodolistPage.fillTodolist(['item1', 'item2', 'item3']);
  await adminTodolistPage.markAllAsComplete();
  await expect(adminTodolistPage.todoCount).toHaveText('0');
});