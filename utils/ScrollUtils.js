class ScrollUtils {
  static async scrollToText(driver, text) {
    await driver.execute('mobile: scroll', { direction: 'down', text });
    return true;
  }
}

module.exports = { ScrollUtils };
