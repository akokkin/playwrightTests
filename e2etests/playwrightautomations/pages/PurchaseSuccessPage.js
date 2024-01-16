import PurchaseSuccessPageConstants from './constants/purchasesuccesspage.constants.json';
import { expect } from '@playwright/test';

export default class PurchaseSuccessPage {
    constructor(page) {
        this.page = page;
    }

    async validateSuccessfullOrder() {
        await this.page.waitForSelector(PurchaseSuccessPageConstants.successPageTitleSelector);
        expect(await this.page.locator(PurchaseSuccessPageConstants.successPageTitleSelector)).toHaveText('Thank you for your purchase!');
        expect(await this.page.locator(PurchaseSuccessPageConstants.orderNumberSelector)).toContainText('Your order number is:');
        expect(await this.page.locator(PurchaseSuccessPageConstants.emailConfirmationTextSelector)).toHaveText('We\'ll email you an order confirmation with details and tracking info.');
    }

    async clickContinueShoppingButton() {
        await this.page.locator(PurchaseSuccessPageConstants.continueShoppingButtonSelector).click();
    }
}