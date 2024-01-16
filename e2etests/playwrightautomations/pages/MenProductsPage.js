import { expect } from '@playwright/test';
import { URL } from 'url';
import MenProductsPageConstants from './constants/menproductspage.constants.json'
const { url, counterSelector, shoppingCartSelector, shoppingCartActiveSelector, cartProceedToCheckoutSelector, counterLoadingClassSelector } = MenProductsPageConstants;

export default class MenProductsPage {
    constructor(page) {
        this.page = page;
        this.selectedProduct = {};
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
            await this.page.waitForSelector(".product-info-main span.price")

            this.selectedProduct.price = await this.page.textContent(".product-info-main span.price");
            this.selectedProduct.name = await this.page.textContent(".page-title> .base");
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

        if (colors.length > 0) {
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
        await this.page.waitForSelector(counterLoadingClassSelector, { state: 'detached' });
        const counterText = await this.page.textContent(counterSelector);

        if (counterText != null) {
            expect(counterText).toBe("1");
        } else {
            console.error('Cart count is wrong')
        }
    }

    async navigateToCheckOut() {
        await this.page.waitForSelector(shoppingCartSelector, { state: 'visible' });

        const shoppingCartButton = await this.page.$$(shoppingCartSelector);
        await shoppingCartButton[0].click();
        await this.page.waitForSelector(shoppingCartActiveSelector);
        await this.page.waitForSelector(cartProceedToCheckoutSelector);
        const proceedToCheckoutButton = await this.page.$$(cartProceedToCheckoutSelector);
        await proceedToCheckoutButton[0].click();
    }

    getSelectedProduct() {
        return this.selectedProduct;
    }
}
