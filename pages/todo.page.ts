import {Page} from "@playwright/test"
import {expect} from "../fixtures/arrayContains"

export class TodoPage {
    readonly page: Page

    constructor(page: Page)
    {
        this.page = page
    }

    async addNewTodo(name: string)
    {
        const newTodoInput = this.page.getByPlaceholder('Enter new todo text here')
        await newTodoInput.focus()
        await newTodoInput.fill(name)
        await this.page.keyboard.press('Enter')
        expect(await this.page.getByRole('listitem').allTextContents()).toContainItemWithText(name)
    }

    async addMultipleTodos(todos: string[])
    {
        todos.forEach(async todo => {
            await this.addNewTodo(todo)
        });
    }
}