import { test, expect } from '@playwright/test';
import RegistrationPage from '../pages/RegistrationPage'

test('User Registration', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    await registrationPage.navigate();

    await registrationPage.fillRegistrationForm('Alex', 'Kokkinidis', 'test@adaptavist.com', 'Pass12345', 'Different_Pass12345');
    await registrationPage.clickOnCreateAccountButton();
    await registrationPage.waitForUmatchingPasswordError();

    //   // Ensure the registration form does not accept different inputs in password fields.
    //   await page.fill('#confirmPasswordInput', 'DifferentPassword123');  

    //   // Ensure all the mandatory fields are completed.
    //   await page.fill('#confirmPasswordInput', 'ValidPassword123');

    //   // Ensure the form submits successfully and creates a new account.
    //   await Promise.all([
    //     page.waitForNavigation(),
    //     page.click('#registerButton'),
    //   ]);

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