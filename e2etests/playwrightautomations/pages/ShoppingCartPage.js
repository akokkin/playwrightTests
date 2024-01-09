import { expect } from '@playwright/test';
import ShoppingCartPageConstants from './constants/shoppingcartpage.constants.json';

export default class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }

  navigate() {
    return this.page.goto(ShoppingCartPageConstants.url);
  }

  async deleteAllProductsFromCart() {
    await this.navigate();
    const deleteButton = await this.page.$$(ShoppingCartPageConstants.deleteItemButtonSelector)

    if (deleteButton.length > 0) {
      const deleteButtons = await this.page.$$(ShoppingCartPageConstants.deleteItemButtonSelector);
      const topDeleteButton = await this.page.locator(ShoppingCartPageConstants.topDeleteItemButtonSelector)

      for (let i = 0; i < deleteButtons.length; i++) {
        await topDeleteButton.click();
      }
      const newDeleteButton = await this.page.$$(ShoppingCartPageConstants.deleteItemButtonSelector); 
      expect(newDeleteButton.length).toBe(0);
    }
  }
}
