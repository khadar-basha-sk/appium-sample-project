const { BasePage } = require('./BasePage');
const { MyDemoAppLocators } = require('../locators/MyDemoAppLocators');

class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = MyDemoAppLocators.home;
  }

  async waitForLoaded() {
    return this.findDisplayed(this.locators.productsTitle, 30000);
  }

  async openFirstProduct() {
    await this.waitForLoaded();
    return this.tap(this.locators.firstProduct);
  }

  async openSort() {
    return this.tap(this.locators.sortButton);
  }
}

module.exports = { HomePage };
