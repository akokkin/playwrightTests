import { expect } from '@playwright/test';
import ShoppingCartPageConstants from './constants/shoppingcartpage.constants.json';

export default class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }

  navigate() {
    return this.page.goto(ShoppingCartPageConstants.url);
  }

  async waitForPageStability() {
    await this.page.waitForFunction(() => {
      const element = document.querySelector('[aria-busy="true"]');
      return !element;
    });
  }

  async deleteAllProductsFromCart() {
    this.navigate();
    await this.page.waitForSelector(ShoppingCartPageConstants.deleteItemButtonSelector, { state: 'visible' });
    const deleteButtons = await this.page.$$(ShoppingCartPageConstants.deleteItemButtonSelector);
    const topDeleteButton = await this.page.locator(ShoppingCartPageConstants.topDeleteItemButtonSelector)

    for (let i = 0; i < deleteButtons.length; i++) {
      await topDeleteButton.click();
      await this.waitForPageStability();
    }

    expect(await this.page.$$(ShoppingCartPageConstants.deleteItemButtonSelector).length).toBe(0);
  }
}
