import PurchaseSuccessPageConstants from './constants/purchasesuccesspage.constants.json';
import { expect } from '@playwright/test';

export default class PurchaseSuccessPage {
    constructor(page) {
        this.page = page;
    }

    async validateSuccessfullOrder() {
        await this.page.waitForURL('**/onepage/success/');
        await this.page.waitForSelector(PurchaseSuccessPageConstants.successPageTitleSelector);
        expect(await this.page.locator(PurchaseSuccessPageConstants.successPageTitleSelector)).toHaveText(PurchaseSuccessPageConstants.thankYouTitleText);
        expect(await this.page.locator(PurchaseSuccessPageConstants.orderNumberSelector)).toContainText(PurchaseSuccessPageConstants.orderNumberText);
        expect(await this.page.locator(PurchaseSuccessPageConstants.emailConfirmationTextSelector)).toHaveText(PurchaseSuccessPageConstants.orderDetailsText);
    }

    async clickContinueShoppingButton() {
        await this.page.locator(PurchaseSuccessPageConstants.continueShoppingButtonSelector).click();
    }
}