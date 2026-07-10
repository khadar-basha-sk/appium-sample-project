const { BasePage } = require('./BasePage');
const { MyDemoAppLocators } = require('../locators/MyDemoAppLocators');

class ProductPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = MyDemoAppLocators.product;
  }

  async waitForLoaded() {
    return this.findDisplayed(this.locators.addToCartButton, 20000);
  }

  async addToCart() {
    await this.waitForLoaded();
    return this.tap(this.locators.addToCartButton);
  }

  async getProductTitle() {
    return this.text(this.locators.title);
  }
}

module.exports = { ProductPage };
