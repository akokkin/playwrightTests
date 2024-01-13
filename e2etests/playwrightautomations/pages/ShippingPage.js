import { expect } from '@playwright/test';
import ShippingPageConstants from './constants/shippingpage.constants.json';
import PaymentPageConstants from './constants/paymentpage.constants.json';

export default class ShippingPage {
    constructor(page) {
        this.page = page;
    }

    navigate() {
        return this.page.goto(ShippingPageConstants.url);
    }

    async selectRandomAddressItem() {
        const addressItemsList = await this.page.$$(ShippingPageConstants.addressObjectSelector);
        expect(addressItemsList.length).toBeGreaterThan(0);
        const randomAddressItem = addressItemsList[Math.floor(Math.random() * addressItemsList.length)];
        await this.page.click(randomAddressItem);
    }

    async selectRandomShippingMethod() {
        const shippingMethodItemsList = await this.page.$$(ShippingPageConstants.shippingMethodSelectButtonSelector);
        expect(shippingMethodItemsList.length).toBeGreaterThan(0);
        const randomAddressItem = shippingMethodItemsList[Math.floor(Math.random() * shippingMethodItemsList.length)];
        await this.page.click(randomAddressItem);
    }

    async clickNextButton() {
        await this.page.waitForSelector(ShippingPageConstants.nextButtonSelector);
        await this.page.click(ShippingPageConstants.nextButtonSelector);
    }

    async selectRandomAddressAndShipping() {
        this.selectRandomAddressItem();
        this.selectRandomShippingMethod();
        this.clickNextButton()
        // await this.page.waitForNavigation(); 
        await this.page.waitForURL(PaymentPageConstants.url);
    }
}