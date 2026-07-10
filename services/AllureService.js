class AllureService {
  static async addEnvironmentInfo(test, env) {
    await test.addAttachment('environment', 'application/json', JSON.stringify(env, null, 2), 'json');
  }

  static async addScreenshot(test, filePath) {
    await test.addAttachment('screenshot', 'image/png', filePath, 'png');
  }
}

module.exports = { AllureService };
