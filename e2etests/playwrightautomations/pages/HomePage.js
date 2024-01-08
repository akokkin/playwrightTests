import { expect } from '@playwright/test';

export default class HomePage {
  url = 'https://magento.softwaretestingboard.com/';

  constructor(page) {
    this.page = page;
  }

  async navigate() {
    return this.page.goto(this.url);
  }

  async clickAccountCreationButton() {
    await expect(this.page.getByRole('link', { name: 'Create an Account' })).toBeVisible();
    await this.page.getByRole('link', { name: 'Create an Account' }).click();
  }
}