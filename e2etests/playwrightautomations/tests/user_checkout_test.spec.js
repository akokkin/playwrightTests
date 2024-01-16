import { test } from '@playwright/test';
import ShippingPage from '../pages/ShippingPage';
import PurchaseSuccessPage from '../pages/PurchaseSuccessPage';
import LoginPage from '../pages/LoginPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import MenProductsPage from '../pages/MenProductsPage';
import PaymentPage from '../pages/PaymentPage';
import Credentials from '../../../credentials.json';
const { emailAddress, password } = Credentials;

test('User Checkout Test', async ({ page }) => {
    const shippingPage = new ShippingPage(page)
    const menProductsPage = new MenProductsPage(page);
    const paymentPage = new PaymentPage(page, menProductsPage);
    const loginPage = new LoginPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const purchaseSuccessPage = new PurchaseSuccessPage(page);


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
    await menProductsPage.navigateToCheckOut();

    //Fill in/Select the required fields.
    //Tap on 'Next' button.
    await shippingPage.selectRandomAddressAndShipping();

    //Ensure the amount and details are correct in the order review.
    await paymentPage.validateOrderDetails();
    //Tap on 'Place Order' button.
    await paymentPage.placeOrder();

    //Ensure user is navigated to the correct page and details are correct. 
    await purchaseSuccessPage.validateSuccessfullOrder();
    //Tap on 'Continue Shopping' button.
    await purchaseSuccessPage.clickContinueShoppingButton();
});