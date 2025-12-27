// pages/SweetsPage.js
import { expect } from '@playwright/test';

export class SweetsPage {
  constructor(page) {
    this.page = page;

    this.addToBasketButtons = page.locator('a.btn.btn-success.addItem', {
      hasText: 'Add to Basket',
    });

    this.basketNavLink = page.locator('a[href="/basket"]');

    this.pageHeading = page.locator('h1', { hasText: /Browse sweets/i });
  }

  async goto() {
    await this.page.goto('/sweets');
    await expect(this.page).toHaveURL(/\/sweets/);

    await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
    await expect(this.addToBasketButtons.first()).toBeVisible({ timeout: 15000 });
  }

  async addNItems(n) {
    const count = await this.addToBasketButtons.count();
    expect(count).toBeGreaterThanOrEqual(n);

    for (let i = 0; i < n; i++) {
      await this.addToBasketButtons.nth(i).click();
    }
  }

  async openBasket() {
    await this.basketNavLink.scrollIntoViewIfNeeded();
    await this.basketNavLink.click({ force: true });
    await expect(this.page).toHaveURL(/\/basket/);
  }
}
