import { test, expect } from '@playwright/test';
import { TodolistPage } from '../pages/todolist.page';
import { AdminTodolistPage } from '../pages/admin.todolist.page';

const listname = 'mylist';
const listitems = ['test1', 'test2', 'test3'];

test('add new todolist', async ({page}) => {
  const todolistPage = new TodolistPage(page);
  const adminTodolistPage = new AdminTodolistPage(page);

  await todolistPage.goto();
  await todolistPage.addNewTodolist(`${listname}`);
  await todolistPage.openTodolist(`${listname}`);
  await adminTodolistPage.fillTodolist(listitems);
  await expect(adminTodolistPage.todoCount).toHaveText('3');
});