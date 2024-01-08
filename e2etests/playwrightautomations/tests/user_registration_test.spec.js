import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/RegistrationPage';
import { waitForDebugger } from 'inspector';
import MyAccountPage from '../pages/MyAccountPage';
import Utils from '../../../utils/Utils';

test('User Registration and Authentication', async ({ page }) => {
    const homePage = new HomePage(page)
    const registrationPage = new RegistrationPage(page);
    const myAccountPage = new MyAccountPage(page);
    const randomNewEmailAddress = Utils.generateRandomEmail(7);

    await homePage.navigate();
    await homePage.clickAccountCreationButton();

    await registrationPage.fillRegistrationForm(
        'Alex', 'Kokkinidis', randomNewEmailAddress, 'Pass12345', 'Different_Pass12345'
    );
    await registrationPage.clickAccountCreateSubmitButton();
    await registrationPage.waitForUmatchingPasswordError();

    await registrationPage.fillRegistrationForm(
        'Alex', 'Kokkinidis', randomNewEmailAddress, randomNewEmailAddress, randomNewEmailAddress
    );
    await registrationPage.clickAccountCreateSubmitButton();
    await registrationPage.waitForSameEmailPasswordError();

    await registrationPage.fillRegistrationForm(
        'Alex', 'Kokkinidis', randomNewEmailAddress, 'Pass12345', 'Pass12345'
    );
    await registrationPage.clickAccountCreateSubmitButton();
    await myAccountPage.assertRedirectedToExpectedURL();
    await myAccountPage.signOut();

    //   // Ensure the user is logged in and navigated to their account page.
    //   expect(page.url()).toBe('https://your-ecommerce-website.com/account');
    // });

    // test('User Login', async ({ page }) => {
    //   // Navigate to the 'Sign In' page.
    //   await page.goto('https://your-ecommerce-website.com');

    //   // Click on the 'Sign In' link/button.
    //   await page.click('#signInButton');

    //   // Ensure the login form accepts valid email address and password.
    //   await page.fill('#loginEmailInput', 'existingemail@example.com');
    //   await page.fill('#loginPasswordInput', 'ExistingPassword123');

    //   // Both fields should be completed with existing user's credentials.
    //   await Promise.all([
    //     page.waitForNavigation(),
    //     page.click('#loginButton'),
    //   ]);

    //   // After successful login, the user is redirected to their account dashboard.
    //   expect(page.url()).toBe('https://your-ecommerce-website.com/account');
});