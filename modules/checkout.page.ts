import { Page,test } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {
  }

  async userInfo(firstname: string, lastname: string, postalcode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstname);
    await this.page.locator('[data-test="lastName"]').fill(lastname);
    await this.page.locator('[data-test="postalCode"]').fill(postalcode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }
  
  async cancel() {
    await this.page.locator('[data-test="cancel"]').click();
  } 

  async backHome(){
    await this.page.locator('[data-test="back-to-products"]').click();
  }
}
