import { expect } from '@playwright/test';

export default class RegistrationPage {
  url = 'https://magento.softwaretestingboard.com/customer/account/create/';
  firstnameSelector = '#firstname';
  lastnameSelector = '#lastname';
  emailSelector = '#email_address';
  passwordSelector = '#password';
  passwordConfirmationSelector = '#password-confirmation';
  passwordConfirmationError = '#password-confirmation-error';
  sameEmailPasswordError = '#password-error';
  createAccountButtonSelector = '#form-validate > div > div.primary > button';

  constructor(page) {
    this.page = page;
  }

  navigate() {
    return this.page.goto(this.url);
  }

  async fillRegistrationForm(firstName, lastName, email, password, passwordConfirmation) {
    await this.page.waitForSelector(this.firstnameSelector, { state: 'visible' });
    await this.page.fill(this.firstnameSelector, firstName);
    await this.page.fill(this.lastnameSelector, lastName);
    await this.page.fill(this.emailSelector, email);
    await this.page.fill(this.passwordSelector, password);
    await this.page.fill(this.passwordConfirmationSelector, passwordConfirmation);
  }

  clickAccountCreateSubmitButton() {
    this.page.waitForSelector(this.createAccountButtonSelector, { state: 'visible' });
    this.page.click(this.createAccountButtonSelector)
  }

  async waitForUmatchingPasswordError() {
    await this.page.waitForSelector(this.passwordConfirmationError, { state: 'visible' });

    const errorMessage = await this.page.textContent(this.passwordConfirmationError);
    expect(errorMessage).toContain('Please enter the same value again.');
  }

  async waitForSameEmailPasswordError() {
    await this.page.waitForSelector(this.sameEmailPasswordError, { state: 'visible' });

    const errorMessage = await this.page.textContent(this.sameEmailPasswordError);
    expect(errorMessage).toContain('The password can\'t be the same as the email address. Create a new password and try again.');
  }
}