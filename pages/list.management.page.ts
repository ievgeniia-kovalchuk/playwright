import {Page} from "@playwright/test";
import {expect} from "../fixtures/arrayContains";
import { Transformers } from "../helpers/transformers";

export class ListManagementPage{
    private readonly page: Page;

    constructor(page: Page)
    {
        this.page = page;
    }

    async addNewList(name: string)
    {
        const addListInput = this.page.getByPlaceholder('Enter new todo list name here')
        await addListInput.focus()
        await addListInput.fill(name)
        await this.page.keyboard.press('Enter')
        name = Transformers.replaceSpacesWithDashes(name)
        expect(await this.page.getByRole('listitem').allTextContents()).toContainItemWithText(name)
    }

    async removeList(name: string)
    {
        name = Transformers.replaceSpacesWithDashes(name)
        this.page.on('dialog', dialog => {
            expect(dialog.message()).toEqual(`Are you sure you want to delete ${name}?`)
            dialog.accept()
        })
        await this.page.getByRole('listitem').filter({hasText: name}).locator('.destroy').click()
        expect(await this.page.getByRole('listitem').allTextContents()).not.toContainItemWithText(name)
    }

    async openList(name: string)
    {
        name = Transformers.replaceSpacesWithDashes(name)
        await this.page.getByRole('listitem').filter({hasText: name}).getByRole('link').click()
        await expect(this.page.getByPlaceholder('Enter new todo text here')).toBeVisible()
    }
}