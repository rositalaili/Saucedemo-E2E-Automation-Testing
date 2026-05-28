import { Page,test } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {
  }
    
  async addProduct(products: string[]) {
     for (const product of products) {
      const formattedProduct = product.toLowerCase().replace(/\s+/g, '-')
      await this.page.locator(`[data-test="add-to-cart-${formattedProduct}"]`).click()
    }
  }

  async getItemPrice(products: string[]): Promise<number> {
  let totalSales = 0;

  for (const product of products) {

    const targetItem = this.page.locator('div.inventory_item', { hasText: product });
    const priceText = await targetItem.getByTestId('inventory-item-price').textContent();
    
    if (priceText) {
      const priceNumber = parseFloat(priceText.replace('$', ''));
      totalSales += priceNumber;
    }
  }
  return totalSales;
  }

  async removeProduct(products: string[]) {
     for (const product of products) {
      const formattedProduct = product.toLowerCase().replace(/\s+/g, '-')
      await this.page.locator(`[data-test="remove-${formattedProduct}"]`).click()
    }
  }

  async cart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async sortPrice() {
    await this.page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  }

}
