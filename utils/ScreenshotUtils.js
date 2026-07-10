const fs = require('fs');
const path = require('path');
const { SCREENSHOTS_ROOT } = require('../config/constants/FrameworkConstants');

class ScreenshotUtils {
  static async capture(driver, name = 'screenshot') {
    fs.mkdirSync(SCREENSHOTS_ROOT, { recursive: true });
    const fileName = `${name}-${Date.now()}.png`;
    const filePath = path.join(SCREENSHOTS_ROOT, fileName);
    const base64 = await driver.takeScreenshot();
    fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
    return filePath;
  }
}

module.exports = { ScreenshotUtils };
