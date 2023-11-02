import {Page, Locator} from "@playwright/test";

export class AdminTodoPage{
    readonly page: Page;

    constructor(page: Page)
    {
        this.page = page;
    }

    async getListAdminView(listName: string)
    {
        return await this.page.locator('.todo-list-list').getByRole('listitem').allTextContents()
    }
}

