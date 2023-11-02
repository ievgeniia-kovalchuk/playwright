import {Page, Locator} from "@playwright/test"
import {expect} from "../fixtures/arrayContains"

export class TodoPage {
    readonly page: Page
    readonly listItems: Locator
    private readonly filters: Locator

    constructor(page: Page)
    {
        this.page = page
        this.listItems = this.page.locator('.todo-list').getByRole('listitem') 
        this.filters = this.page.locator('.filters').getByRole('listitem')
    }

    async addNewTodo(name: string)
    {
        const newTodoInput = this.page.getByPlaceholder('Enter new todo text here')
        await newTodoInput.fill(name)
        await newTodoInput.focus()
        await this.page.keyboard.press('Enter')
        expect(await this.listItems.allTextContents()).toContainItemWithText(name)
    }

    async addMultipleTodos(todos: string[])
    {
        for (const todo of todos)
        {
            await this.addNewTodo(todo)
        }
    }

    async markAllAsComplete(){
        await this.page.locator('#toggle-all').check()
        for (const item of await this.listItems.all())
        {
            await expect (item).toHaveClass('completed')
        }
    }

    async markOneAsComplete(name: string)
    {
        const listItemCheckbox = await this.listItems.filter({ hasText: name }).getByRole('checkbox')
        await listItemCheckbox.click()
        await expect(listItemCheckbox).toBeChecked()
    }

    async deleteTodo(name: string)
    {
        const listItemDeleteButton = await this.listItems.filter({ hasText: name}).getByRole('button')
        await listItemDeleteButton.click()
        expect(await this.listItems.allTextContents()).not.toContainItemWithText(name)
    }

    async getTodoCount(){
        return await this.page.locator('.todo-count strong').textContent()
    }

    async filterAll(){
        await this.filters.filter({hasText: 'All'}).getByRole('link').click()
    }

    async filterActive(){
        await this.filters.filter({hasText: 'Active'}).getByRole('link').click()
    }

    async filterCompleted(){
        await this.filters.filter({hasText: 'Completed'}).getByRole('link').click()
    }

    async clearCompleted(){
        await this.page.locator('.clear-completed').click()
    }
}