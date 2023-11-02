import {Page, expect} from "@playwright/test";

export class NavigationPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    private async gotoBaseUrl(){
        await this.page.goto('simpletodolist/todolists.html');
    }

    async listsPage(){
        await this.gotoBaseUrl()
        await this.page.locator('#navtodolists').click();
        await this.page.waitForURL('**\/simpletodolist\/todolists.html');
    }

    async adminLoginPage(){
        await this.gotoBaseUrl()
        await this.page.locator('#navadminlogin').click();
        await this.page.waitForURL('**\/simpletodolist\/adminlogin.html');
    }

    async logout(){
        await this.page.locator('#navadminlogout').click();
        await expect(this.page.locator('#navadminlogout')).toHaveAttribute('href');
    }

    async adminViewPage(){
        await this.gotoBaseUrl();
        await this.page.goto('/simpletodolist/adminview.html');
    }
}