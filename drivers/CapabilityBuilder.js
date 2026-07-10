const path = require('path');
const { PROJECT_ROOT } = require('../config/constants/FrameworkConstants');

class CapabilityBuilder {
  build(platform, configuration) {
    const normalizedPlatform = (platform || configuration.PLATFORM || 'android').toLowerCase();
    const appType = (configuration.APP_TYPE || 'native').toLowerCase();

    if (normalizedPlatform === 'web' || appType === 'web') {
      return this.buildWebCapabilities(configuration);
    }

    if (normalizedPlatform === 'android') {
      return this.buildAndroidCapabilities(configuration, appType);
    }

    if (normalizedPlatform === 'ios') {
      return this.buildIosCapabilities(configuration, appType);
    }

    throw new Error(`Unsupported platform '${platform}'. Expected android, ios, or web.`);
  }

  buildAndroidCapabilities(configuration, appType) {
    const baseCaps = {
      platformName: 'Android',
      'appium:automationName': configuration.AUTOMATION || 'UIAutomator2',
      'appium:deviceName': configuration.DEVICE_NAME,
      'appium:platformVersion': configuration.PLATFORM_VERSION,
      'appium:newCommandTimeout': Number.parseInt(configuration.NEW_COMMAND_TIMEOUT || '300', 10),
      'appium:noReset': this.toBoolean(configuration.NO_RESET),
      'appium:fullReset': this.toBoolean(configuration.FULL_RESET),
      'appium:adbExecTimeout': Number.parseInt(configuration.ADB_EXEC_TIMEOUT || '120000', 10),
    };

    const androidCaps = {
      ...baseCaps,
      'appium:androidInstallTimeout': Number.parseInt(configuration.ANDROID_INSTALL_TIMEOUT || '180000', 10),
      'appium:uiautomator2ServerInstallTimeout': Number.parseInt(
        configuration.UIAUTOMATOR2_SERVER_INSTALL_TIMEOUT || '120000',
        10
      ),
      maxInstances: 1,
    };

    if ((configuration.DEVICE || '').toLowerCase() === 'emulator' && configuration.DEVICE_NAME) {
      androidCaps['appium:avd'] = configuration.DEVICE_NAME;
    }

    if (configuration.UDID) {
      androidCaps['appium:udid'] = configuration.UDID;
    }

    if (appType === 'web' || configuration.BROWSER_NAME) {
      androidCaps.browserName = configuration.BROWSER_NAME || 'Chrome';
      return androidCaps;
    }

    if (configuration.APP_PATH) {
      androidCaps['appium:app'] = path.resolve(PROJECT_ROOT, configuration.APP_PATH);
    }

    if (configuration.APP_PACKAGE) {
      androidCaps['appium:appPackage'] = configuration.APP_PACKAGE;
      androidCaps['appium:appWaitPackage'] = configuration.APP_PACKAGE;
    }

    if (configuration.APP_ACTIVITY) {
      androidCaps['appium:appActivity'] = configuration.APP_ACTIVITY;
    }

    if (configuration.APP_WAIT_ACTIVITY) {
      androidCaps['appium:appWaitActivity'] = configuration.APP_WAIT_ACTIVITY;
    }

    return androidCaps;
  }

  buildIosCapabilities(configuration, appType) {
    const iosCaps = {
      platformName: 'iOS',
      'appium:automationName': configuration.AUTOMATION || 'XCUITest',
      'appium:deviceName': configuration.DEVICE_NAME,
      'appium:platformVersion': configuration.PLATFORM_VERSION,
      'appium:newCommandTimeout': Number.parseInt(configuration.NEW_COMMAND_TIMEOUT || '300', 10),
      'appium:noReset': this.toBoolean(configuration.NO_RESET),
      'appium:fullReset': this.toBoolean(configuration.FULL_RESET),
    };

    if (configuration.UDID) {
      iosCaps['appium:udid'] = configuration.UDID;
    }

    if (appType === 'web' || configuration.BROWSER_NAME) {
      iosCaps.browserName = configuration.BROWSER_NAME || 'Safari';
      return iosCaps;
    }

    if (configuration.APP_PATH) {
      iosCaps['appium:app'] = path.resolve(PROJECT_ROOT, configuration.APP_PATH);
    }

    if (configuration.BUNDLE_ID) {
      iosCaps['appium:bundleId'] = configuration.BUNDLE_ID;
    }

    return iosCaps;
  }

  buildWebCapabilities(configuration) {
    return {
      browserName: configuration.BROWSER_NAME || 'chrome',
      acceptInsecureCerts: true,
      maxInstances: Number.parseInt(configuration.MAX_INSTANCES || '1', 10),
    };
  }

  toBoolean(value) {
    return String(value).toLowerCase() === 'true';
  }
}

module.exports = { CapabilityBuilder };
