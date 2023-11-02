import { test} from '@playwright/test';
import { PageManager } from '../pages/page.manager';
import { expect } from "../fixtures/arrayContains";
import { Transformers } from "../helpers/transformers";

test.describe('admin view', () => {
  let pm : PageManager;

  test.beforeEach(async ({page}) => {
    pm = new PageManager(page);
    await pm.navigateTo().adminViewPage();
  });

  test('default list is visible', async() => {
    expect (await pm.onAdminTodoPage().getListAdminView('eviltester')).toContainItemWithText('eviltester {"active":0,"completed":0,"total":0}')
  });

  test('new list is visible', async () => {
    const listName = Transformers.replaceSpacesWithDashes('my list');
    await pm.navigateTo().listsPage();
    await pm.onListManagementPage().addNewList(listName);
    await pm.onListManagementPage().openList(listName);
    const todos = ['todo1', 'todo2', 'todo3'];
    await pm.onTodoPage().addMultipleTodos(todos);
    await pm.onTodoPage().markOneAsComplete(todos[0]);

    await pm.navigateTo().adminViewPage();
    expect (await pm.onAdminTodoPage().getListAdminView('eviltester')).toContainItemWithText(`${listName} {"active":2,"completed":1,"total":3}`)
  });
});
