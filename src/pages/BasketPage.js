// pages/BasketPage.js
import { expect } from '@playwright/test';

export class BasketPage {
  constructor(page) {
    this.page = page;

    this.collectLabel = page.locator('label[for="exampleRadios1"]');
    this.shippingLabel = page.locator('label[for="exampleRadios2"]');

    this.continueToCheckoutButton = page.getByRole('button', { name: /Continue to checkout/i });

    this.firstName = page.locator(
      'xpath=//label[contains(normalize-space(),"First name")]/following::input[1]'
    );
    this.lastName = page.locator(
      'xpath=//label[contains(normalize-space(),"Last name")]/following::input[1]'
    );
    this.email = page.locator(
      'xpath=//label[normalize-space()="Email"]/following::input[1]'
    );
    this.address = page.locator(
      'xpath=//label[normalize-space()="Address"]/following::input[1]'
    );
    this.zip = page.locator(
      'xpath=//label[normalize-space()="Zip"]/following::input[1]'
    );

    this.nameOnCard = page.locator(
      'xpath=//label[contains(normalize-space(),"Name on card")]/following::input[1]'
    );
    this.cardNumber = page.locator(
      'xpath=//label[contains(normalize-space(),"Credit card number")]/following::input[1]'
    );
    this.expiration = page.locator(
      'xpath=//label[normalize-space()="Expiration"]/following::input[1]'
    );
    this.cvv = page.locator(
      'xpath=//label[normalize-space()="CVV"]/following::input[1]'
    );

    this.errFirstName = page.getByText(/Valid first name is required/i);
    this.errLastName = page.getByText(/Valid last name is required/i);
    this.errEmail = page.getByText(/valid email address/i);
    this.errZip = page.getByText(/Zip code required/i);
    this.errCard = page.getByText(/Credit card number is required/i);
  }

  async goto() {
    await this.page.goto('/basket');
    await expect(this.page).toHaveURL(/\/basket/);
  }

  async getTotalValue() {
    const row = this.page.locator('text=Total (GBP)').locator('..');
    await expect(row).toBeVisible({ timeout: 10000 });

    const raw = (await row.textContent()) || '';
    const match = raw.match(/£\s*([0-9]+(\.[0-9]{2})?)/);
    if (!match) throw new Error(`Could not parse total from: "${raw}"`);
    return Number(match[1]);
  }

  async selectCollect() {
    await this.collectLabel.scrollIntoViewIfNeeded();
    await this.collectLabel.click();
  }

  async selectStandardShipping() {
    await this.shippingLabel.scrollIntoViewIfNeeded();
    await this.shippingLabel.click();
  }

  async submitCheckout() {
    await this.continueToCheckoutButton.scrollIntoViewIfNeeded();
    await this.continueToCheckoutButton.click();
  }

  async fillCheckoutForm({
    firstName,
    lastName,
    email,
    address,
    zip,
    nameOnCard,
    cardNumber,
    expiration,
    cvv,
  }) {
    await expect(this.firstName).toBeVisible({ timeout: 15000 });

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.address.fill(address);
    await this.zip.fill(zip);

    await this.nameOnCard.fill(nameOnCard);
    await this.cardNumber.fill(cardNumber);
    await this.expiration.fill(expiration);
    await this.cvv.fill(cvv);
  }
}
