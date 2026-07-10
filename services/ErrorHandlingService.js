const { Logger } = require('../utils/Logger');
const { ScreenshotUtils } = require('../utils/ScreenshotUtils');
const { AllureService } = require('./AllureService');

class ErrorHandlingService {
  constructor(driver) {
    this.driver = driver;
    this.logger = new Logger();
  }

  async handle(error, testContext) {
    try {
      const screenshotPath = await ScreenshotUtils.capture(this.driver, 'error');
      this.logger.error('Test failure captured', error);
      if (testContext?.currentTest && typeof testContext.currentTest.addAttachment === 'function') {
        await AllureService.addScreenshot(testContext.currentTest, screenshotPath);
      }
    } catch (captureError) {
      this.logger.error('Failure during error handling', captureError);
    }
    throw error;
  }
}

module.exports = { ErrorHandlingService };
