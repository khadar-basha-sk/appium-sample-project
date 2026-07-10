class SwipeUtils {
  static async swipe(driver, direction = 'left') {
    const { width, height } = await driver.getWindowSize();
    const startX = width / 2;
    const startY = height / 2;
    const endX = direction === 'left' ? width * 0.2 : width * 0.8;
    const endY = startY;

    await driver.touchAction([
      { action: 'press', x: startX, y: startY },
      { action: 'wait', ms: 500 },
      { action: 'moveTo', x: endX, y: endY },
      { action: 'release' },
    ]);
  }
}

module.exports = { SwipeUtils };
