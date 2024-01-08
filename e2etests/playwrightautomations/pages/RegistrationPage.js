export default class RegistrationPage {
  url =  'https://magento.softwaretestingboard.com/customer/account/create/';
  firstnameSelector = '#firstname';
  lastnameSelector = '#lastname';
  emailSelector = '#email_address';
  passwordSelector = '#password';
  passwordConfirmationSelector = '#password-confirmation';
  passwordConfirmationError = '#password-confirmation-error';

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

    await this.page.waitForSelector(this.emailSelector, { state: 'visible' });
    await this.page.fill(this.emailSelector, email);
    await this.page.fill(this.passwordSelector, password);
    await this.page.fill(this.passwordConfirmationSelector, passwordConfirmation);
  }

  clickOnCreateAccountButton() {
    //TODO
  }

  async waitForUmatchingPasswordError() {
    await this.page.waitForSelector(this.passwordConfirmationError, { state: 'visible' });

    const errorMessage = await this.page.textContent(this.passwordConfirmationError);
    expect(errorMessage).toContain('Please enter the same value again.');
  }
}