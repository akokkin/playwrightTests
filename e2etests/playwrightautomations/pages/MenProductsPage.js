import { expect } from '@playwright/test';
import { URL } from 'url';
import MyAccountPageConstants from './constants/myaccountpage.constants.json';
import HomePageConstants from './constants/homepage.constants.json';
import MenProductsPageConstants from './constants/menproductspage.constants.json'
const { url, counterSelector, productsSidebarSelector, shoppingCartSelector, shoppingCartActiveSelector, cartProceedToCheckoutSelector } = MenProductsPageConstants;

export default class MenProductsPage {
    constructor(page) {
        this.page = page;
    }

    navigate() {
        return this.page.goto(url);
    }

    async assertProductsCategoriesListIsVisible() {
        await this.page.waitForURL('**/men.html');
        const currentURL = await this.page.url();
        const parsedExpectedURL = new URL(MenProductsPageConstants.url);
        const parsedCurrentURL = new URL(currentURL);

        expect(parsedCurrentURL.pathname).toBe(parsedExpectedURL.pathname);
        expect(parsedCurrentURL.host).toBe(parsedExpectedURL.host);
    }

    async navigateToRandomProductCategory() {
        await this.page.waitForSelector('#narrow-by-list2 > dd >.items > li > a');
        const children = await this.page.$$('#narrow-by-list2 > dd >.items > li > a');

        if (children.length > 0) {
            const randomIndex = Math.floor(Math.random() * children.length);
            const randomChild = children[randomIndex];

            await randomChild.click();
            await this.page.isVisible('.products.wrapper.grid.products-grid');

        } else {
            console.error('No child elements found in products categories');
        }
    }

    async navigateToRandomProductDetailsPage() {
        await this.page.waitForSelector('.products.list.items.product-items > .item.product.product-item > .product-item-info > a');
        const children = await this.page.$$('.products.list.items.product-items > .item.product.product-item > .product-item-info > a');

        if (children.length > 0) {
            const randomIndex = Math.floor(Math.random() * children.length);
            const randomChild = children[randomIndex];

            await randomChild.click();

        } else {
            console.error('No child elements found in products list');
        }
    }

    async addProductToCart() {
        await this.page.waitForSelector('.swatch-option.text');
        const sizes = await this.page.$$('.swatch-option.text');

        if (sizes.length > 0) {
            const randomIndex = Math.floor(Math.random() * sizes.length);
            const randomSize = sizes[randomIndex];

            await randomSize.click();
        } else {
            console.error('No sizes were retrieved')
        }

        const colors = await this.page.$$('.swatch-option.color');

        if (sizes.length > 0) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndex];

            await randomColor.click();
        } else {
            console.error('No colors were retrieved')
        }

        await this.page.click('#product-addtocart-button');

        const element = await this.page.$$('div > a > span.counter.qty._block-content-loading');

        if (element.length > 0) {
            await this.page.$$('div > a > span.counter.qty:not(._block-content-loading)');
        }
    }

    async assertQuickCartProductsCountEqualsOne() {
        await this.page.waitForSelector(counterSelector);
        const counterText = await this.page.textContent(counterSelector);

        if (counterText != null) {
            expect(counterText).toBe("1");
        } else {
            console.error('Cart count is wrong')
        }
    }

    async navigateToCheckOut() {
        const shoppingCartButton = await this.page.$$(shoppingCartSelector);
        await shoppingCartButton.click();
        await this.page.waitForSelector(shoppingCartActiveSelector);
        await this.page.waitForSelector(cartProceedToCheckoutSelector);
        const proceedToCheckoutButton = this.page.$$(cartProceedToCheckoutSelector);

        proceedToCheckoutButton.click();
    }
}