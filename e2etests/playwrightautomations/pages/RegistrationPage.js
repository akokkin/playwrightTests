import { expect } from '@playwright/test';
import RegistrationPageConstants from './constants/registrationpage.constants.json';

export default class RegistrationPage {
  constructor(page) {
    this.page = page;
  }

  navigate() {
    return this.page.goto(RegistrationPageConstants.url);
  }

  async fillRegistrationForm(firstName, lastName, email, password, passwordConfirmation) {
    await this.page.waitForSelector(RegistrationPageConstants.firstnameSelector, { state: 'visible' });
    await this.page.fill(RegistrationPageConstants.firstnameSelector, firstName);
    await this.page.fill(RegistrationPageConstants.lastnameSelector, lastName);
    await this.page.fill(RegistrationPageConstants.emailSelector, email);
    await this.page.fill(RegistrationPageConstants.passwordSelector, password);
    await this.page.fill(RegistrationPageConstants.passwordConfirmationSelector, passwordConfirmation);
  }

  clickAccountCreateSubmitButton() {
    this.page.waitForSelector(RegistrationPageConstants.createAccountButtonSelector, { state: 'visible' });
    this.page.click(RegistrationPageConstants.createAccountButtonSelector)
  }

  async waitForUmatchingPasswordError() {
    await this.page.waitForSelector(RegistrationPageConstants.passwordConfirmationError, { state: 'visible' });

    const errorMessage = await this.page.textContent(RegistrationPageConstants.passwordConfirmationError);
    expect(errorMessage).toContain('Please enter the same value again.');
  }

  async waitForSameEmailPasswordError() {
    await this.page.waitForSelector(RegistrationPageConstants.sameEmailPasswordError, { state: 'visible' });

    const errorMessage = await this.page.textContent(RegistrationPageConstants.sameEmailPasswordError);
    expect(errorMessage).toContain('The password can\'t be the same as the email address. Create a new password and try again.');
  }
}