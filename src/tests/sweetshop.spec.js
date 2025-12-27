// tests/sweetshop.spec.js
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SweetsPage } from '../pages/SweetsPage';
import { BasketPage } from '../pages/BasketPage';

test.describe('SE302 HW02 - Sweet Shop Tests', () => {

  test('TC01 - Navigate from Home to Sweets page', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.goToSweets(); 

    await expect(page.getByRole('heading', { name: /Browse sweets/i })).toBeVisible();
  });

  test('TC03 - Add Multiple items from Sweets page', async ({ page }) => {
  const sweets = new SweetsPage(page);

  await sweets.goto();
  await sweets.addNItems(3);
  await sweets.openBasket();

  await expect(page.locator('#basketCount')).toHaveText('3', { timeout: 10000 });
});


  test('TC04 - Delivery option updates total', async ({ page }) => {
    const sweets = new SweetsPage(page);
    const basket = new BasketPage(page);

    await sweets.goto();
    const count = await sweets.addToBasketButtons.count();
    expect(count).toBeGreaterThanOrEqual(1);

    await sweets.addNItems(1);
    await sweets.openBasket();

    await basket.selectCollect();
    const totalCollect = await basket.getTotalValue();

    await basket.selectStandardShipping();
    const totalShip = await basket.getTotalValue();

    expect(totalShip).toBeGreaterThan(totalCollect);
  });

  test('TC08 - Submit checkout with empty required fields', async ({ page }) => {
    const basket = new BasketPage(page);

    await basket.goto();
    await basket.submitCheckout(); 

    await expect(basket.errFirstName).toBeVisible();
    await expect(basket.errLastName).toBeVisible();
    await expect(basket.errEmail).toBeVisible();
    await expect(basket.errZip).toBeVisible();
    await expect(basket.errCard).toBeVisible();
  });

test('TC09 - Invalid email format in checkout', async ({ page }) => {
  const sweets = new SweetsPage(page);
  const basket = new BasketPage(page);

  await sweets.goto();
  await sweets.addNItems(1);
  await sweets.openBasket();

  await basket.submitCheckout();

  await basket.fillCheckoutForm({
    firstName: 'Test',
    lastName: 'Test',
    email: 'abc@', 
    address: 'Test Street 1',
    zip: '71000',
    nameOnCard: 'Test Test',
    cardNumber: '1111111111111111',
    expiration: '12/30',
    cvv: '123',
  });

  await basket.submitCheckout();

  await expect(basket.errEmail).toBeVisible();
});


});
