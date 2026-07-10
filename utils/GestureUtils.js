class GestureUtils {
  static async tap(driver, x, y) {
    await driver.touchAction([{ action: 'tap', x, y }]);
  }
}

module.exports = { GestureUtils };
