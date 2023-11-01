import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/page.manager'
//import { TodolistPage } from '../pages/todolist.page'
//import { AdminTodolistPage } from '../pages/admin.todolist.page'

const listname = 'mylist'
const listitems = ['test1', 'test2', 'test3']

test.describe('lists page', () => {
  let pm : PageManager

  test.beforeEach(async ({page}) => {
    pm = new PageManager(page)
    await pm.navigateTo().listsPage()
  })
  
  test('add new list', async() => {
    await pm.onListManagementPage().addNewList('test list')
  })

  test('remove list', async () => {
    const listName = 'to be removed'
    await pm.onListManagementPage().addNewList(listName)
    await pm.onListManagementPage().removeList(listName)
  })

  test('open list', async () => {
    const listName = 'my list'
    await pm.onListManagementPage().addNewList(listName)
    await pm.onListManagementPage().openList(listName)
  })
})

test.describe('todo list page', () =>
{
  let pm : PageManager
  const listName = 'test list'

  test.beforeEach(async ({page}) => {
    pm = new PageManager(page)
    await pm.navigateTo().listsPage()
    await pm.onListManagementPage().addNewList(listName)
    await pm.onListManagementPage().openList(listName)
  })

  test('add new todo', async () => {
    await pm.onTodoPage().addNewTodo('todo1')
  })

  test('add multiple todos', async () =>{
    const todos = ['todo1', 'todo2', 'todo3']
    await pm.onTodoPage().addMultipleTodos(todos)
  })
})

/*test('add new todolist', async ({page}) => {
  const todolistPage = new TodolistPage(page)
  const adminTodolistPage = new AdminTodolistPage(page)

  await todolistPage.goto()
  await todolistPage.addNewTodolist(`${listname}`)
  await todolistPage.openTodolist(`${listname}`)
  await adminTodolistPage.fillTodolist(listitems)
  await expect(adminTodolistPage.todoCount).toHaveText('3')
});*/