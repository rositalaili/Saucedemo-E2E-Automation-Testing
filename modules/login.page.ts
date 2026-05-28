import { Page,test } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {
  }

  async navigate(url: string) {
    const baseUrl = url;
    await this.page.goto(baseUrl);
  }
    
  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async getErrorMessage() {
    const errorMessageLocator = this.page.locator('[data-test="error"]').filter({ hasText: 'Epic sadface: Username and password do not match any user in this service' }).first();
    await errorMessageLocator.waitFor();
    return errorMessageLocator.innerText();
  }  
}
