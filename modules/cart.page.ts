import { Page,test } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {
  }

  async removeProduct(product: string) {
    await this.page.locator(`[data-test="remove-${product}"]`).click();
  }

  async continueShopping() {
    await this.page.locator('[data-test="continue-shopping"]').click();
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }  


}
