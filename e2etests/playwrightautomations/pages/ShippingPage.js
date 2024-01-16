import { expect } from '@playwright/test';
import ShippingPageConstants from './constants/shippingpage.constants.json';

export default class ShippingPage {
    constructor(page) {
        this.page = page;
    }

    navigate() {
        return this.page.goto(ShippingPageConstants.url);
    }

    async selectRandomAddressItem() {
        await this.page.waitForURL(ShippingPageConstants.url, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector(ShippingPageConstants.notSelectedAddressShipHereButtonSelector, { state: 'attached' });
        const shipHereButtonsList = await this.page.$$(ShippingPageConstants.notSelectedAddressShipHereButtonSelector);
        const visibleButtonsList = shipHereButtonsList.filter(async x => await x.isVisible());
        expect(visibleButtonsList.length).toBeGreaterThan(0);
        const visibleButtonLocator = visibleButtonsList[Math.floor(Math.random() * visibleButtonsList.length)];

        await visibleButtonLocator.click();
        await this.page.waitForSelector(ShippingPageConstants.shippingMethodLoaderSelector, { state: 'detached' });
    }

    async selectRandomShippingMethod() {
        await this.page.waitForSelector(ShippingPageConstants.shippingMethodSelectButtonSelector);
        const shippingMethodCheckboxList = await this.page.$$(ShippingPageConstants.shippingMethodSelectButtonSelector);
        expect(shippingMethodCheckboxList.length).toBeGreaterThan(0);
        const randomShippingMethod = shippingMethodCheckboxList[Math.floor(Math.random() * shippingMethodCheckboxList.length)];

        await randomShippingMethod.click({ "force": true });
    }

    async proceedToPayment() {
        await this.page.waitForSelector(ShippingPageConstants.nextButtonSelector, { state: 'visible' });

        // await this.page.waitForSelector(ShippingPageConstants.nextButtonSelector);
        await this.page.locator(ShippingPageConstants.nextButtonSelector).click();
    }

    async selectRandomAddressAndShipping() {
        await this.selectRandomAddressItem();
        await this.selectRandomShippingMethod();
        await this.proceedToPayment()
        await this.page.waitForNavigation();
    }
}