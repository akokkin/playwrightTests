import exp from 'constants';
import PaymentPageConstants from './constants/paymentpage.constants.json';
import PurchaseSuccessPageConstants from './constants/purchasesuccesspage.constants.json';
import { expect } from "@playwright/test";

export default class PaymentPage {

    constructor(page, menProductsPage) {
        this.page = page
        this.menProductsPage = menProductsPage;
    }

    async validateOrderDetails() {
        const selectedProduct = this.menProductsPage.getSelectedProduct();
        const addedProductNameWithoutWhitespaces = selectedProduct.name.replace(/\s+/g, '');
        const addedProductPriceWithoutWhitespaces = selectedProduct.price.replace(/\s+/g, '');
        const actualNameWithoutWhitespaces = (await this.page.locator(PaymentPageConstants.summaryProductNameSelector).textContent()).replace(/\s+/g, '');
        const actualPriceWithoutWhitespaces = (await this.page.locator(PaymentPageConstants.summaryProductSubtotalSelector).textContent()).replace(/\s+/g, '');

        expect(actualNameWithoutWhitespaces).toBe(addedProductNameWithoutWhitespaces);
        expect(actualPriceWithoutWhitespaces).toBe(addedProductPriceWithoutWhitespaces);

        const actualSubtotal = await this.page.locator(PaymentPageConstants.summaryProductSubtotalSelector).textContent();
        const actualShipping = await this.page.locator(PaymentPageConstants.summaryShippingSelector).textContent();
        const actualOrderTotal = await this.page.locator(PaymentPageConstants.summaryOrderTotalSelector).textContent();

        const parsedSubtotal = parseFloat(actualSubtotal.replace('$', ''));
        const parsedShipping = parseFloat(actualShipping.replace('$', ''));
        const parsedOrderTotal = parseFloat(actualOrderTotal.replace('$', ''));

        expect(parsedOrderTotal).toEqual(parsedShipping + parsedSubtotal);
    }

    async placeOrder() {
        await this.page.locator(PaymentPageConstants.placeOrderButtonSelector).click();
        // await this.page.waitForNavigation();
    }
}