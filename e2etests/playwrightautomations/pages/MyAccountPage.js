import { expect } from '@playwright/test';
import { URL } from 'url';

export default class MyAccountPage {
    url = 'https://magento.softwaretestingboard.com/customer/account/';
    dropdownSelector = 'body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.customer-welcome > span';
    signOutlinkSelector = 'a[href="https://magento.softwaretestingboard.com/customer/account/logout/"]';

    constructor(page) {
        this.page = page;
    }

    navigate() {
        return this.page.goto(this.url);
    }

    async assertRedirectedToExpectedURL() {
        await this.page.waitForNavigation();
        const currentURL = await this.page.url();
        const parsedExpectedURL = new URL(this.url);
        const parsedCurrentURL = new URL(currentURL);

        expect(parsedCurrentURL.pathname).toBe(parsedExpectedURL.pathname);
        expect(parsedCurrentURL.host).toBe(parsedExpectedURL.host);
    }

    async signOut() {
        await this.page.waitForSelector(this.dropdownSelector, { state: 'visible' });
        await this.page.click(this.dropdownSelector);
    
        const signOutLink = await this.page.$(this.signOutlinkSelector);
        await signOutLink.click();
    }
}