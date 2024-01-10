import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/ShoppingCartPage';
import MyAccountPage from '../pages/MyAccountPage';
import Utils from '../../../utils/Utils';
import LoginPage from '../pages/LoginPage';
import ShoppingCartPage from '../pages/ShoppingCartPage'
import MenProductsPage from '../pages/MenProductsPage'
import Credentials from '../../../credentials.json'
const { emailAddress, password } = Credentials;

test('User Checkout Test', async ({ page }) => {
    const homePage = new HomePage(page)
    const menProductsPage = new MenProductsPage(page);
    const myAccountPage = new MyAccountPage(page);
    const loginPage = new LoginPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);



    //Login as a registered user
    await loginPage.navigate();
    await loginPage.signIn(emailAddress, password);
    //Delete any existing items in cart
    await shoppingCartPage.deleteAllProductsFromCart();
    
    //Add 1 random product to your cart.
    await menProductsPage.navigate();
    await menProductsPage.assertProductsCategoriesListIsVisible();
    await menProductsPage.navigateToRandomProductCategory();
    await menProductsPage.navigateToRandomProductDetailsPage();
    await menProductsPage.addProductToCart();
    await menProductsPage.assertQuickCartProductsCountEqualsOne();
    
    //Tap on the Cart icon on the top right corner of the page.
    //Tap on 'Proceed to Checkout' button.
    await navigateToCheckOut()
    
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
