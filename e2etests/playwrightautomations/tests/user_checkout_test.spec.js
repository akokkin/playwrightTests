import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/ShoppingCartPage';
import MyAccountPage from '../pages/MyAccountPage';
import Utils from '../../../utils/Utils';
import LoginPage from '../pages/LoginPage';
import ShoppingCartPage from '../pages/ShoppingCartPage'
import MenProductsPage from '../pages/MenProductsPage'
import Credentials from '../../../credentials.json'
import { log } from 'console';
const emailAddress = Credentials.emailAddress;
const password = Credentials.password;
const randomNewEmailAddress = Utils.generateRandomEmail(7);

test.beforeEach(async ({ page }) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.signIn(emailAddress, password);

    await shoppingCartPage.deleteAllProductsFromCart();
});

test('User Checkout Test', async ({ page }) => {
    const homePage = new HomePage(page)
    const menProductsPage = new MenProductsPage(page);
    const myAccountPage = new MyAccountPage(page);
    const loginPage = new LoginPage(page);



    //Login as a registered user.
    await loginPage.navigate();
    await loginPage.signIn(emailAddress, password);
    await myAccountPage.assertRedirectedToMyAccountPage();

    await menProductsPage.navigate();
    await menProductsPage.assertProductsCategoriesListIsVisible();
    await menProductsPage.navigateToRandomProductCategory();
    await menProductsPage.navigateToRandomProductDetailsPage();
    await menProductsPage.addProductToCart();
    await menProductsPage.assertQuickCartProductsCount();
    await new Promise(resolve => setTimeout(resolve, 5000));



    //Add 1 random product to your cart.
    //Tap on the Cart icon on the top right corner of the page.
    //Tap on 'Proceed to Checkout' button.
    //Fill in the required fields.
    //Tap on 'Next' button.
    //Ensure the amount and details are correct in the order review.
    //Tap on 'Place Order' button.
    //Ensure user is navigated to the correct page and details are correct. 
    //Tap on 'Continue Shopping' button.
    //Navigate to 'My Orders'.
    //Ensure the retrieved details are correct.
    //Tap on 'View Order' button.
    //Ensure the retrieved details are correct.
});