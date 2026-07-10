class ClipboardUtils {
  static async setText(driver, text) {
    await driver.execute('mobile: setClipboard', { text });
    return true;
  }

  static async getText(driver) {
    const result = await driver.execute('mobile: getClipboard');
    return result;
  }
}

module.exports = { ClipboardUtils };
