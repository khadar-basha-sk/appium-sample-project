const { DriverFactory } = require('./DriverFactory');

class IOSDriver {
  static async create(environment = 'local') {
    const factory = new DriverFactory();
    return factory.createDriver('ios', environment);
  }
}

module.exports = { IOSDriver };
