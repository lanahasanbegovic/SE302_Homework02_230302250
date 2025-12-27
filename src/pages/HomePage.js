// pages/HomePage.js
import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.sweetsNavLink = page.getByRole('link', { name: /^Sweets$/i });
    this.browseSweetsLink = page.getByRole('link', { name: /Browse Sweets/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async goToSweets() {
    if (await this.browseSweetsLink.isVisible().catch(() => false)) {
      await this.browseSweetsLink.click();
    } else {
      await this.sweetsNavLink.click();
    }
    await expect(this.page).toHaveURL(/\/sweets/); 
  }
}
