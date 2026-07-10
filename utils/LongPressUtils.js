class LongPressUtils {
  static async longPress(driver, element) {
    await driver.touchAction([{ action: 'longPress', element }]);
    return true;
  }
}

module.exports = { LongPressUtils };
