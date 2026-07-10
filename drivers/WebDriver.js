const { DriverFactory } = require('./DriverFactory');

class WebDriver {
  static async create(environment = 'local') {
    const factory = new DriverFactory();
    return factory.createDriver('web', environment);
  }
}

module.exports = { WebDriver };
