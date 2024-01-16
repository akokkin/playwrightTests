import { expect } from '@playwright/test';
import { URL } from 'url';
import MenProductsPageConstants from './constants/menproductspage.constants.json'
const { addToCartButtonSelector, productSizeSelector, productColorSelector, productNameSelector, productPriceSelector, productListingSelector, productsGridSelector, randomProductCategorySelector, url, counterSelector, shoppingCartSelector, shoppingCartActiveSelector, cartProceedToCheckoutSelector, cartCounterLoaderSelector } = MenProductsPageConstants;

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
        await this.page.waitForSelector(randomProductCategorySelector);
        const productCategoriesList = await this.page.$$(randomProductCategorySelector);

        if (productCategoriesList.length > 0) {
            const randomIndex = Math.floor(Math.random() * productCategoriesList.length);
            const randomCategory = productCategoriesList[randomIndex];

            await randomCategory.click();
            await this.page.isVisible(productsGridSelector);

        } else {
            console.error('No child elements found in products categories');
        }
    }

    async navigateToRandomProductDetailsPage() {
        await this.page.waitForSelector(productListingSelector);
        const productsList = await this.page.$$(productListingSelector);

        if (productsList.length > 0) {
            const randomIndex = Math.floor(Math.random() * productsList.length);
            const randomProduct = productsList[randomIndex];

            await randomProduct.click();
            await this.page.waitForSelector(productPriceSelector)

            this.selectedProduct.price = await this.page.textContent(productPriceSelector);
            this.selectedProduct.name = await this.page.textContent(productNameSelector);
        } else {
            console.error('No child elements found in products list');
        }
    }

    async addProductToCart() {
        await this.page.waitForSelector(productSizeSelector);
        const sizes = await this.page.$$(productSizeSelector);

        if (sizes.length > 0) {
            const randomIndex = Math.floor(Math.random() * sizes.length);
            const randomSize = sizes[randomIndex];

            await randomSize.click();
        } else {
            console.error('No sizes were retrieved')
        }

        const colors = await this.page.$$(productColorSelector);

        if (colors.length > 0) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndex];

            await randomColor.click();
        } else {
            console.error('No colors were retrieved')
        }

        await this.page.click(addToCartButtonSelector);
    }

    async assertQuickCartProductsCountEqualsOne() {
        await this.page.waitForSelector(cartCounterLoaderSelector, { state: 'detached' });
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
