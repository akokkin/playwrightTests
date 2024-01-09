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
    this.navigate();
    await this.page.waitForSelector(ShoppingCartPageConstants.deleteItemButtonSelector);
    const deleteButtons = await this.page.$$(ShoppingCartPageConstants.deleteItemButtonSelector);
    console.log("@@@deleteButtons count is: " + deleteButtons.length)

    if (deleteButtons.length > 0) { //TODO: Fix method
      for (let i = 0; i < deleteButtons.length; i++) {
        console.log("@@@count is: " + i)
        await this.page.waitForSelector(ShoppingCartPageConstants.deleteItemButtonSelector, { state: 'visible' });
        await deleteButtons[i].click();
      }
    }
  }
}