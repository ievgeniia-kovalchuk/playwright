import { Page } from "@playwright/test";
import { NavigationPage } from "./navigation.page";
import { ListManagementPage } from "./list.management.page";
import { TodoPage } from "./todo.page";
import { AdminLoginPage } from "./admin.login.page";
import { AdminTodoPage } from "./admin.todo.page";

export class PageManager {
    readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly listManagementPage: ListManagementPage;
    private readonly todoPage: TodoPage;
    private readonly adminLoginPage: AdminLoginPage;
    private readonly adminTodoPage: AdminTodoPage;

    constructor(page: Page)
    {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.listManagementPage = new ListManagementPage(this.page);
        this.todoPage = new TodoPage(page);
        this.adminLoginPage = new AdminLoginPage(page);
        this.adminTodoPage = new AdminTodoPage(page);
    }

    navigateTo() {
        return this.navigationPage;
    }

    onListManagementPage() {
        return this.listManagementPage;
    }

    onTodoPage() {
        return this.todoPage;
    }

    onAdminLoginPage() {
        return this.adminLoginPage;
    }

    onAdminTodoPage() {
        return this.adminTodoPage;
    }
}