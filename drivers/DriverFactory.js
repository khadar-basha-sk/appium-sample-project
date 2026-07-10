const { remote } = require('webdriverio');
const { CapabilityBuilder } = require('./CapabilityBuilder');
const { EnvironmentLoader } = require('../config/environments/EnvironmentLoader');
const { Logger } = require('../utils/Logger');

class DriverFactory {
  constructor() {
    this.logger = new Logger();
    this.capabilityBuilder = new CapabilityBuilder();
  }

  async createDriver(platform = 'android', environment = 'local') {
    const config = EnvironmentLoader.load(environment);
    const targetPlatform = platform || config.PLATFORM;
    const capabilities = this.capabilityBuilder.build(targetPlatform, config);
    const driver = await remote({
      protocol: 'http',
      hostname: config.APPIUM_HOST || '127.0.0.1',
      port: Number.parseInt(config.APPIUM_PORT || '4723', 10),
      path: '/',
      capabilities,
      logLevel: 'info',
    });

    this.logger.info(`Driver created for ${targetPlatform} using ${environment}`);
    return driver;
  }
}

module.exports = { DriverFactory };
