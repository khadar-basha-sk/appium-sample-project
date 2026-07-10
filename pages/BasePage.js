class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async waitForElement(element, timeout = 10000) {
    if (element && typeof element.waitForDisplayed === 'function') {
      await element.waitForDisplayed({ timeout });
    }
  }

  async findExisting(selectors) {
    const selectorList = this.normalizeSelectors(selectors);
    for (const selector of selectorList) {
      const element = await this.driver.$(selector);
      if (await element.isExisting()) {
        return element;
      }
    }

    return null;
  }

  async findDisplayed(selectors, timeout = 20000) {
    const selectorList = this.normalizeSelectors(selectors);
    await this.driver.waitUntil(
      async () => {
        const element = await this.findExisting(selectorList);
        return Boolean(element && (await element.isDisplayed()));
      },
      {
        timeout,
        timeoutMsg: `None of the expected selectors were displayed: ${selectorList.join(', ')}`,
      }
    );

    return this.findExisting(selectorList);
  }

  async tap(selectors, timeout) {
    const element = await this.findDisplayed(selectors, timeout);
    await element.click();
    return element;
  }

  async type(selectors, value, timeout) {
    const element = await this.findDisplayed(selectors, timeout);
    await element.clearValue();
    await element.setValue(value);
    return element;
  }

  async text(selectors, timeout) {
    const element = await this.findDisplayed(selectors, timeout);
    return element.getText();
  }

  async isDisplayed(selectors, timeout = 5000) {
    try {
      await this.findDisplayed(selectors, timeout);
      return true;
    } catch (_error) {
      return false;
    }
  }

  normalizeSelectors(selectors) {
    return (Array.isArray(selectors) ? selectors : [selectors]).flat();
  }
}

module.exports = { BasePage };
