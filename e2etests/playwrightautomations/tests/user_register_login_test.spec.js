import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/ShoppingCartPage';
import MyAccountPage from '../pages/MyAccountPage';
import Utils from '../../../utils/Utils';
import LoginPage from '../pages/LoginPage';
import HomepageConstants from '../pages/constants/homepage.constants.json'

test('User Registration and Authentication', async ({ page }) => {
    const homePage = new HomePage(page)
    const registrationPage = new RegistrationPage(page);
    const myAccountPage = new MyAccountPage(page);
    const loginPage = new LoginPage(page);
    const randomNewEmailAddress = Utils.generateRandomEmail(7);
    const correctPassword = HomepageConstants.correctPassword;
    const incorrectPassword = HomepageConstants.incorrectPassword;
    const unsimilarPassword = HomepageConstants.unsimilarPassword;
    const firstName = HomepageConstants.firstName;
    const lastName = HomepageConstants.lastName;
    const incorrectEmailAddress = 'foo';

    //Navigate to the 'Create An Account' page.
    await homePage.navigate();
    await homePage.clickAccountCreationButton();

    //Ensure the registration form does not accept different inputs in password fields
    await registrationPage.fillRegistrationForm(firstName, lastName, randomNewEmailAddress, correctPassword, unsimilarPassword);
    await registrationPage.clickAccountCreateSubmitButton();
    await registrationPage.waitForUnmatchingPasswordError();

    //Ensure the registration form does not accept same email address and password inputs.
    await registrationPage.fillRegistrationForm(firstName, lastName, randomNewEmailAddress, randomNewEmailAddress, randomNewEmailAddress);
    await registrationPage.clickAccountCreateSubmitButton();
    await registrationPage.waitForSameEmailPasswordError();

    //Ensure the registration form does not accept same incorrect password formats.
    await registrationPage.fillRegistrationForm(firstName, lastName, randomNewEmailAddress, incorrectPassword, incorrectPassword);
    await registrationPage.clickAccountCreateSubmitButton();
    await registrationPage.waitForInvalidPasswordError();

    //Ensure the registration form accepts valid Email addresses, Passwords, First Name, Last Name.
    await registrationPage.fillRegistrationForm(firstName, lastName, randomNewEmailAddress, correctPassword, correctPassword);
    await registrationPage.clickAccountCreateSubmitButton();

    //Ensure the form submits successfully and creates a new account.
    //Ensure the user is logged in and navigated to their account page.
    await myAccountPage.assertRedirectedToMyAccountPage();

    await myAccountPage.signOut();
    setTimeout(() => { }, 5100)
    await myAccountPage.assertLogOutIsSuccessful();


    //Navigate to the 'Sign In' page
    await loginPage.navigate();

    //Ensure the login form accepts valid email address and password.
    await loginPage.signIn(incorrectEmailAddress, incorrectPassword);
    await loginPage.waitForInvalidEmailAddressError();
    
    //Both fields should be completed with existing user's credentials.
    await loginPage.signIn(randomNewEmailAddress, correctPassword);

    //After successfull login, user is redirected to their account dashboard.
    await myAccountPage.assertRedirectedToMyAccountPage();
});