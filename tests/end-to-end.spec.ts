import { test, expect } from '@playwright/test';
import { LoginPage } from '../modules/login.page';
import { InventoryPage } from '../modules/inventory.page';
import { CartPage } from '../modules/cart.page';
import { CheckoutPage } from '../modules/checkout.page';
import { validUser, invalidUser } from '../fixtures/user.fixtures';
import { baseUrl } from '../fixtures/base-url.fixtures';
import { testData } from '../fixtures/test-data.fixture';

test('End-to-End flow', async ({ page }, testInfo) => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    await test.step('Login with Invalid User', async () => {
      loginPage = new LoginPage(page);
      await loginPage.navigate(baseUrl.url);
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
      await loginPage.login(invalidUser.username, invalidUser.password);
      await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');

      await test.step('Screenshot Step Login', async () => {
        const screenshot = await page.screenshot({ path: `${testInfo.outputDir}/step-0-login-failed.png` });
        await testInfo.attach('Screenshot Login', { body: screenshot, contentType: 'image/png' });
      });

    });

    await test.step('Login with Valid User', async () => {
      loginPage = new LoginPage(page);
      await loginPage.navigate(baseUrl.url);
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
      await loginPage.login(validUser.username, validUser.password);
      await expect(page).toHaveURL(/\/inventory.html/);

      await test.step('Screenshot Step Login', async () => {
        const screenshot = await page.screenshot({ path: `${testInfo.outputDir}/step-1-login-success.png` });
        await testInfo.attach('Screenshot Login', { body: screenshot, contentType: 'image/png' });
      });

    });

    await test.step('Add Products to Cart', async () => {
      inventoryPage = new InventoryPage(page);
      await inventoryPage.addProduct(testData.products);
      await inventoryPage.cart();
      for (const product of testData.products) {
        const productLink = page.getByRole('link', { name: product });
        await expect(productLink).toBeVisible();
      };

      await test.step('Screenshot Step Add to Cart', async () => {
        const screenshot = await page.screenshot({ path: `${testInfo.outputDir}/step-2-cart.png` });
        await testInfo.attach('Screenshot Add to Cart', { body: screenshot, contentType: 'image/png' });
      });

    });

    await test.step('Checkout Item Sales on Cart', async () => {
      cartPage = new CartPage(page);
      checkoutPage = new CheckoutPage(page);
      await cartPage.checkout();
      await expect(page).toHaveURL(/\/checkout-step-one.html/);
      await checkoutPage.userInfo(testData.firstname, testData.lastname, testData.postalcode);
      
      const priceElements = page.locator('[data-test="inventory-item-price"]');
      const count = await priceElements.count();

      let subtotal = 0;
      for (let i = 0; i < count; i++) {
          const priceText = await priceElements.nth(i).textContent();
          
          if (priceText) {
              const priceNumber = parseFloat(priceText.replace('$', ''));
              subtotal += priceNumber;
          }
      }
      subtotal = parseFloat(subtotal.toFixed(2));

      const taxElements = page.locator('[data-test="tax-label"]');
      const taxText = await taxElements.textContent();
      let tax = 0;
      if (taxText) {
        tax = parseFloat(taxText.replace('Tax: $', ''));
      };

      const totalActual = subtotal + tax; 
      await expect(page.locator('[data-test="total-label"]')).toContainText(`Total: $${totalActual.toFixed(2)}`); 
      
      await test.step('Screenshot Step Checkout Overview', async () => {
        const screenshot = await page.screenshot({ path: `${testInfo.outputDir}/step-3-checkout.png` });
        await testInfo.attach('Screenshot Checkout Overview', { body: screenshot, contentType: 'image/png' });
      });
      
      await checkoutPage.finish();
      await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
      
      await test.step('Screenshot Step Checkout Success', async () => {
        const screenshot = await page.screenshot({ path: `${testInfo.outputDir}/step-4-checkout-success.png` });
        await testInfo.attach('Screenshot Checkout Overview', { body: screenshot, contentType: 'image/png' });
      });
    
    });

    await test.step('Sort order to "Price (high to low)".', async () => {
      await checkoutPage.backHome();
      await inventoryPage.sortPrice();
      
      const priceElements = page.locator('[data-test="inventory-item-price"]');
      const count = await priceElements.count();

      const actualPrices = [];
      for (let i = 0; i < count; i++) {
          const priceText = await priceElements.nth(i).textContent();
          if (priceText) {
              const priceNumber = parseFloat(priceText.replace('$', ''));
              actualPrices.push(priceNumber);
          }
      }
      const expectedPrices = [...actualPrices].sort((a, b) => b - a);
      expect(actualPrices).toEqual(expectedPrices);

      await test.step('Screenshot Step Sorting High to Low', async () => {
        const screenshot = await page.screenshot({ path: `${testInfo.outputDir}/step-5-sorting.png` });
        await testInfo.attach('Screenshot Sorting High to Low', { body: screenshot, contentType: 'image/png' });
      });
    });
  });
