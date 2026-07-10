const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { PROJECT_ROOT, DEFAULT_ENVIRONMENT } = require('../constants/FrameworkConstants');

class EnvironmentLoader {
  static load(environment = process.env.ENV || DEFAULT_ENVIRONMENT) {
    const envFile = `.env.${environment}`;
    const envPath = path.join(PROJECT_ROOT, envFile);

    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath, override: false });
    } else {
      dotenv.config({ path: path.join(PROJECT_ROOT, '.env'), override: false });
    }

    const config = {
      PLATFORM: process.env.PLATFORM || 'android',
      DEVICE: process.env.DEVICE || 'emulator',
      APP: process.env.APP || 'my-demo-app',
      APP_TYPE: process.env.APP_TYPE || 'native',
      BROWSER_NAME: process.env.BROWSER_NAME || '',
      BASE_URL: process.env.BASE_URL || '',
      AUTOMATION: process.env.AUTOMATION || 'UIAutomator2',
      APPIUM_PORT: process.env.APPIUM_PORT || '4723',
      APPIUM_HOST: process.env.APPIUM_HOST || '127.0.0.1',
      DEVICE_NAME: process.env.DEVICE_NAME || 'Pixel_4',
      PLATFORM_VERSION: process.env.PLATFORM_VERSION || '14',
      APP_PATH: process.env.APP_PATH || 'apps/android/mda-2.2.0-25.apk',
      ADB_EXEC_TIMEOUT: process.env.ADB_EXEC_TIMEOUT || '120000',
      ANDROID_INSTALL_TIMEOUT: process.env.ANDROID_INSTALL_TIMEOUT || '180000',
      UIAUTOMATOR2_SERVER_INSTALL_TIMEOUT: process.env.UIAUTOMATOR2_SERVER_INSTALL_TIMEOUT || '120000',
      NEW_COMMAND_TIMEOUT: process.env.NEW_COMMAND_TIMEOUT || '300',
      NO_RESET: process.env.NO_RESET || 'false',
      FULL_RESET: process.env.FULL_RESET || 'false',
      MAX_INSTANCES: process.env.MAX_INSTANCES || '1',
      RETRY_COUNT: process.env.RETRY_COUNT || '1',
      UDID: process.env.UDID || process.env.ADB_DEVICE_SERIAL || 'emulator-5554',
      APP_PACKAGE: process.env.APP_PACKAGE || 'com.saucelabs.mydemoapp.android',
      APP_ACTIVITY:
        process.env.APP_ACTIVITY || 'com.saucelabs.mydemoapp.android.view.activities.SplashActivity',
      APP_WAIT_ACTIVITY:
        process.env.APP_WAIT_ACTIVITY || 'com.saucelabs.mydemoapp.android.view.activities.*',
      BUNDLE_ID: process.env.BUNDLE_ID || '',
      WORKSPACE: PROJECT_ROOT,
      ENVIRONMENT: environment,
    };

    return config;
  }
}

module.exports = { EnvironmentLoader };
