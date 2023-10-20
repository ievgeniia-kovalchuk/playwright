import { test, expect } from '@playwright/test';
import { TodolistPage } from '../pages/todolist.page';
import { todo } from 'node:test';

test('add new todolist', async ({page}) => {
  const todolistPage = new TodolistPage(page);

  await todolistPage.goto();
  await todolistPage.addNewTodolist('mylist');
  await todolistPage.openTodolist('mylist');
});