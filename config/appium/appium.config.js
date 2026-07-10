const { DEFAULT_APPIUM_PORT } = require('../constants/FrameworkConstants');

module.exports = {
  host: process.env.APPIUM_HOST || '127.0.0.1',
  port: process.env.APPIUM_PORT || DEFAULT_APPIUM_PORT,
  logLevel: 'info',
  commandTimeout: 600,
  noReset: false,
  newCommandTimeout: 300,
};
