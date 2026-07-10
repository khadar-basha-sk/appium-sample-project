class KeyboardUtils {
  static async hideKeyboard(driver) {
    try {
      await driver.hideKeyboard();
    } catch {
      return false;
    }
    return true;
  }
}

module.exports = { KeyboardUtils };
