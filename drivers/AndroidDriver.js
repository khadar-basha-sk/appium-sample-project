const { DriverFactory } = require('./DriverFactory');

class AndroidDriver {
  static async create(environment = 'local') {
    const factory = new DriverFactory();
    return factory.createDriver('android', environment);
  }
}

module.exports = { AndroidDriver };
