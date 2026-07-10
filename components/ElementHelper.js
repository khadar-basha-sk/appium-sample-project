class ElementHelper {
  constructor(driver) {
    this.driver = driver;
  }

  async click(element) {
    await element.click();
  }

  async type(element, value) {
    await element.setValue(value);
  }

  async clear(element) {
    await element.clearValue();
  }
}

module.exports = { ElementHelper };
