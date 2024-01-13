import { expect } from '@playwright/test';
import { URL } from 'url';
import MyAccountPageConstants from './constants/myaccountpage.constants.json';
import HomePageConstants from './constants/homepage.constants.json';

export default class MyAccountPage {
    constructor(page) {
        this.page = page;
    }

    navigate() {
        return this.page.goto(MyAccountPageConstants.myAccountPageUrl);
    }

    async assertRedirectedToMyAccountPage() {
        await this.page.waitForSelector(MyAccountPageConstants.userPropertiesSidebarSelector);
        const currentURL = await this.page.url();
        const parsedExpectedURL = new URL(MyAccountPageConstants.myAccountPageUrl);
        const parsedCurrentURL = new URL(currentURL);

        expect(parsedCurrentURL.pathname).toBe(parsedExpectedURL.pathname);
        expect(parsedCurrentURL.host).toBe(parsedExpectedURL.host);
    }

    async signOut() {
        await this.page.waitForURL('**/customer/account/');
        await this.page.waitForSelector(MyAccountPageConstants.dropdownSelector, { state: 'visible' });
        await this.page.click(MyAccountPageConstants.dropdownSelector);

        await this.page.waitForSelector(MyAccountPageConstants.signOutlinkSelector, { state: 'visible' });
        await this.page.click(MyAccountPageConstants.signOutlinkSelector);
    }


    async assertLogOutIsSuccessful() {
        await this.page.waitForNavigation();
        const currentURL = await this.page.url();
        const parsedExpectedURL = new URL(HomePageConstants.url);
        const parsedCurrentURL = new URL(currentURL);

        expect(parsedCurrentURL.pathname).toBe(parsedExpectedURL.pathname);
        expect(parsedCurrentURL.host).toBe(parsedExpectedURL.host);
    }
}