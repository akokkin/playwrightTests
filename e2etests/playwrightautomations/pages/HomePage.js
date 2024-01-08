class HomePage {
    constructor(page) {
      this.page = page;
      this.url = 'https://magento.softwaretestingboard.com/';
      this.profileLinkSelector = 'body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(3) > a';
    }
  
    async navigate() {
      await this.page.goto(this.url);
    }
  
    async clickAccountCreationButton() {
        await this.page.click(this.accountCreationButtonSelector);
      }
  }
  
  module.exports = HomePage;