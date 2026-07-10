class TapUtils {
  static async tap(driver, element) {
    await element.click();
    return true;
  }
}

module.exports = { TapUtils };
