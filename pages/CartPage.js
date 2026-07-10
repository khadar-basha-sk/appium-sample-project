const { BasePage } = require('./BasePage');
const { MyDemoAppLocators } = require('../locators/MyDemoAppLocators');

class CartPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = MyDemoAppLocators.cart;
  }

  async waitForLoaded() {
    return this.findDisplayed([this.locators.title, this.locators.proceedToCheckoutButton], 20000);
  }

  async proceedToCheckout() {
    await this.waitForLoaded();
    return this.tap(this.locators.proceedToCheckoutButton);
  }

  async hasItem() {
    return this.isDisplayed(this.locators.itemName, 10000);
  }
}

module.exports = { CartPage };
