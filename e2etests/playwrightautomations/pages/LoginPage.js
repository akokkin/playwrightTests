import { expect } from '@playwright/test';
import LoginPageConstants from './constants/loginpage.constants.json'

export default class LoginPage {

    constructor(page) {
        this.page = page
    }

    async navigate() {
        return this.page.goto(LoginPageConstants.url);
    }

    async signIn(emailAddress, password) {
        await expect(this.page.locator(LoginPageConstants.emailSelector)).toBeVisible();
        await expect(this.page.locator(LoginPageConstants.passwordSelector)).toBeVisible();
        
        await this.page.fill(LoginPageConstants.emailSelector, emailAddress);
        await this.page.fill(LoginPageConstants.passwordSelector, password);
        
        await expect(this.page.locator(LoginPageConstants.signInButtonSelector)).toBeVisible();
        console.log(this.page.locator(LoginPageConstants.signInButtonSelector));
        await this.page.locator(LoginPageConstants.signInButtonSelector).click();
    }

    async waitForInvalidEmailAddressError() {
        await this.page.waitForSelector(LoginPageConstants.invalidAddressErrorSelector, { state: 'visible' });
    
        const errorMessage = await this.page.textContent(LoginPageConstants.invalidAddressErrorSelector);
        expect(errorMessage).toContain('Please enter a valid email address (Ex: johndoe@domain.com).');
      }
}