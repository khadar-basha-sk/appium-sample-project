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
        await this.dismissBlockingSystemDialogs();
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

  async dismissBlockingSystemDialogs() {
    const waitButtons = [
      'id=android:id/aerr_wait',
      'android=new UiSelector().resourceId("android:id/aerr_wait")',
      'android=new UiSelector().text("Wait")',
    ];

    for (const selector of waitButtons) {
      try {
        const element = await this.driver.$(selector);
        if ((await element.isExisting()) && (await element.isDisplayed())) {
          await element.click();
          await this.driver.pause(1000);
          return true;
        }
      } catch {
        // Some drivers throw while system dialogs are changing; keep probing safely.
      }
    }

    return false;
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
    } catch {
      return false;
    }
  }

  normalizeSelectors(selectors) {
    return (Array.isArray(selectors) ? selectors : [selectors]).flat();
  }
}

module.exports = { BasePage };
