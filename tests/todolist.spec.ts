import { test, expect } from '@playwright/test'
import { TodolistPage } from '../pages/todolist.page'
import { AdminTodolistPage } from '../pages/admin.todolist.page'

const listname = 'mylist'
const listitems = ['test1', 'test2', 'test3']
let todolistPage

test.describe('todolist', () =>
{
  test.beforeEach(async ({page}) =>
  {
    todolistPage = new TodolistPage(page)
    await todolistPage.goto()
  })

  test('add new todolist', async ({page}) => {
    const adminTodolistPage = new AdminTodolistPage(page)
  
    await todolistPage.addNewTodolist(`${listname}`)
    expect (await todolistPage.getAllTodolistNames()).toContain(`${listname}`)

    await todolistPage.openTodolist(`${listname}`)
    await adminTodolistPage.fillTodolist(listitems)
    await expect(adminTodolistPage.todoCount).toHaveText('3')
  })
})
