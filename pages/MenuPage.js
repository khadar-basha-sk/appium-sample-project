const { BasePage } = require('./BasePage');
const { MyDemoAppLocators } = require('../locators/MyDemoAppLocators');

class MenuPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = MyDemoAppLocators.menu;
  }

  async waitForLoaded() {
    return this.findDisplayed(this.locators.drawer, 10000);
  }

  async openLogin() {
    await this.waitForLoaded();
    return this.tap(this.locators.login);
  }

  async logout() {
    await this.waitForLoaded();
    return this.tap(this.locators.logout);
  }

  async resetAppState() {
    await this.waitForLoaded();
    return this.tap(this.locators.resetAppState);
  }
}

module.exports = { MenuPage };
