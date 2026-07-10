const { BasePage } = require('./BasePage');
const { MyDemoAppLocators } = require('../locators/MyDemoAppLocators');

class CheckoutPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = MyDemoAppLocators.checkout;
  }

  async waitForShippingAddress() {
    return this.findDisplayed(this.locators.fullName, 20000);
  }

  async fillShippingAddress(address) {
    await this.waitForShippingAddress();
    await this.type(this.locators.fullName, address.fullName);
    await this.type(this.locators.address1, address.address1);

    if (address.address2) {
      await this.type(this.locators.address2, address.address2);
    }

    await this.type(this.locators.city, address.city);
    await this.type(this.locators.state, address.state);
    await this.type(this.locators.zip, address.zip);
    await this.type(this.locators.country, address.country);
  }

  async continueToPayment() {
    return this.tap(this.locators.toPaymentButton);
  }

  async fillPayment(payment) {
    await this.findDisplayed(this.locators.cardNumber, 20000);
    await this.type(this.locators.fullName, payment.fullName);
    await this.type(this.locators.cardNumber, payment.cardNumber);
  }

  async reviewOrder() {
    return this.tap(this.locators.reviewOrderButton);
  }

  async placeOrder() {
    return this.tap(this.locators.placeOrderButton);
  }

  async waitForComplete() {
    return this.findDisplayed(this.locators.completeMessage, 30000);
  }
}

module.exports = { CheckoutPage };
