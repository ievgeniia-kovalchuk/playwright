import { test} from '@playwright/test';
import { PageManager } from '../pages/page.manager';
import {expect} from "../fixtures/arrayContains";

test.describe('lists page', () => {
  let pm : PageManager;

  test.beforeEach(async ({page}) => {
    pm = new PageManager(page);
    await pm.navigateTo().listsPage();
  });
  
  test('add new list', async() => {
    await pm.onListManagementPage().addNewList('test list');
  });

  test('remove list', async () => {
    const listName = 'to be removed';
    await pm.onListManagementPage().addNewList(listName);
    await pm.onListManagementPage().removeList(listName);
  });

  test('open list', async () => {
    const listName = 'my list';
    await pm.onListManagementPage().addNewList(listName);
    await pm.onListManagementPage().openList(listName);
  });
});

test.describe('todo list page', () =>
{
  let pm : PageManager;
  const listName = 'test list';
  const todos = ['todo1', 'todo2', 'todo3'];

  test.beforeEach(async ({page}) => {
    pm = new PageManager(page);
    await pm.navigateTo().listsPage();
    await pm.onListManagementPage().addNewList(listName);
    await pm.onListManagementPage().openList(listName);
  });

  test('add new todo', async () => {
    await pm.onTodoPage().addNewTodo('todo1');
  });

  test('add multiple todos', async () =>{
    await pm.onTodoPage().addMultipleTodos(todos);
    expect (await pm.onTodoPage().getTodoCount()).toEqual('3');
  });

  test('mark all as complete', async () => {
    await pm.onTodoPage().addMultipleTodos(todos);
    expect (await pm.onTodoPage().getTodoCount()).toEqual('3');

    await pm.onTodoPage().markAllAsComplete();
    expect (await pm.onTodoPage().getTodoCount()).toEqual('0');
  });

  test('mark one as complete', async () => {
    await pm.onTodoPage().addNewTodo('todo');
    await pm.onTodoPage().markOneAsComplete('todo');
  });

  test('delete one todo item', async () => {
    await pm.onTodoPage().addMultipleTodos(todos);
    expect (await pm.onTodoPage().getTodoCount()).toEqual('3');

    await pm.onTodoPage().deleteTodo(todos[1]);
    expect (await pm.onTodoPage().getTodoCount()).toEqual('2');
  });

  test('filters', async () => {
    await pm.onTodoPage().addMultipleTodos(todos);
    await pm.onTodoPage().markOneAsComplete(todos[0]);

    await pm.onTodoPage().filterCompleted();
    expect(await pm.onTodoPage().listItems.allTextContents()).toContainItemWithText(todos[0]);
    expect(await pm.onTodoPage().listItems.allTextContents()).not.toContainItemWithText(todos[1]);
    expect(await pm.onTodoPage().listItems.allTextContents()).not.toContainItemWithText(todos[2]);

    await pm.onTodoPage().filterActive();
    expect(await pm.onTodoPage().listItems.allTextContents()).not.toContainItemWithText(todos[0]);
    expect(await pm.onTodoPage().listItems.allTextContents()).toContainItemWithText(todos[1]);
    expect(await pm.onTodoPage().listItems.allTextContents()).toContainItemWithText(todos[2]);

    await pm.onTodoPage().filterAll();
    expect(await pm.onTodoPage().listItems.allTextContents()).toContainItemWithText(todos[0]);
    expect(await pm.onTodoPage().listItems.allTextContents()).toContainItemWithText(todos[1]);
    expect(await pm.onTodoPage().listItems.allTextContents()).toContainItemWithText(todos[2]);
  });

  test('clear completed', async () => {
    await pm.onTodoPage().addMultipleTodos(todos);
    await pm.onTodoPage().markOneAsComplete(todos[0]);
    await pm.onTodoPage().clearCompleted();

    expect(await pm.onTodoPage().listItems.allTextContents()).not.toContainItemWithText(todos[0]);
    expect(await pm.onTodoPage().listItems.allTextContents()).toContainItemWithText(todos[1]);
    expect(await pm.onTodoPage().listItems.allTextContents()).toContainItemWithText(todos[2]);
  });
});