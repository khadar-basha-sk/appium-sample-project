const { BasePage } = require('./BasePage');
const { MyDemoAppLocators } = require('../locators/MyDemoAppLocators');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = MyDemoAppLocators.login;
  }

  async enterUsername(username) {
    return this.type(this.locators.username, username);
  }

  async enterPassword(password) {
    return this.type(this.locators.password, password);
  }

  async tapLogin() {
    return this.tap(this.locators.loginButton);
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    return this.tapLogin();
  }

  async clearLoginForm() {
    for (const selector of [this.locators.username, this.locators.password]) {
      const element = await this.findExisting(selector);
      if (element) {
        await element.clearValue();
      }
    }
  }

  async waitForLoginScreen() {
    return this.findDisplayed(this.locators.loginButton, 20000);
  }

  async expectLoginValidationVisible() {
    return (
      (await this.isDisplayed(this.locators.usernameRequiredError)) ||
      (await this.isDisplayed(this.locators.passwordRequiredError)) ||
      (await this.isDisplayed(this.locators.loginButton))
    );
  }
}

module.exports = { LoginPage };
