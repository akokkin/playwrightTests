import { expect } from '@playwright/test';
import HomepageConstants from './constants/homepage.constants.json'

export default class HomePage {

  constructor(page) {
    this.page = page;
  }

  async navigate() {
    return this.page.goto(HomepageConstants.url);
  }

  async clickAccountCreationButton() {
    await expect(this.page.locator(HomepageConstants.createAccountButtonSelector)).toBeVisible();
    await this.page.locator(HomepageConstants.createAccountButtonSelector).click();
  }
}