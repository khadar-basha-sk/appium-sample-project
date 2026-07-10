const { BasePage } = require('./BasePage');
const { MyDemoAppLocators } = require('../locators/MyDemoAppLocators');

class Navigation extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = MyDemoAppLocators.common;
  }

  async openMenu() {
    return this.tap(this.locators.menuButton);
  }

  async openCart() {
    return this.tap(this.locators.cartButton);
  }
}

module.exports = { Navigation };
