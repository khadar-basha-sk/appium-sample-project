const path = require('path');
const { EnvironmentLoader } = require('../environments/EnvironmentLoader');
const { CapabilityBuilder } = require('../../drivers/CapabilityBuilder');
const { PROJECT_ROOT, REPORTS_ROOT, LOGS_ROOT, SCREENSHOTS_ROOT } = require('../constants/FrameworkConstants');

const config = EnvironmentLoader.load(process.env.ENV || 'local');
const capabilityBuilder = new CapabilityBuilder();
const capabilities = [capabilityBuilder.build(config.PLATFORM, config)];

exports.config = {
  runner: 'local',
  specs: [path.join(PROJECT_ROOT, 'specs', '**', '*.js')],
  exclude: [],
  maxInstances: Number.parseInt(config.MAX_INSTANCES, 10) || 1,
  maxInstancesPerCapability: 1,
  capabilities,
  logLevel: 'info',
  bail: 0,
  baseUrl: config.BASE_URL || '',
  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: Number.parseInt(config.RETRY_COUNT, 10) || 1,
  framework: 'mocha',
  suites: {
    smoke: ['specs/common/sample.spec.js'],
    regression: ['specs/android/login.spec.js', 'specs/common/sample.spec.js'],
    android: ['specs/android/login.spec.js'],
    emulator: ['specs/android/login.spec.js'],
    'real-device': ['specs/android/login.spec.js'],
    parallel: ['specs/common/sample.spec.js', 'specs/android/login.spec.js'],
    web: ['specs/web/**/*.js'],
    ios: ['specs/common/sample.spec.js'],
    all: ['specs/common/sample.spec.js', 'specs/android/login.spec.js'],
  },
  mochaOpts: {
    ui: 'bdd',
    timeout: 600000,
  },
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: path.join(REPORTS_ROOT, 'allure-results'),
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  beforeSession: [
    async function (_config, capabilities) {
      const sessionCapabilities = capabilities[0] || capabilities;
      if (sessionCapabilities && sessionCapabilities.platformName) {
        global.__SESSION_PLATFORM__ = sessionCapabilities.platformName;
      }
    },
  ],
  beforeSuite: [
    async function () {
      global.__TEST_START_TIME__ = Date.now();
    },
  ],
  beforeTest: [],
  beforeCommand: [],
  afterCommand: [],
  afterTest: [
    async function (_test, _context, { error }) {
      if (error) {
        await browser.saveScreenshot(path.join(SCREENSHOTS_ROOT, `failure-${Date.now()}.png`));
      }
    },
  ],
  afterSuite: [],
  afterSession: [],
  outputDir: LOGS_ROOT,
  path: '/',
  hostname: config.APPIUM_HOST || process.env.APPIUM_HOST || '127.0.0.1',
  port: Number.parseInt(config.APPIUM_PORT || process.env.APPIUM_PORT || '4723', 10),
  services: [],
  files: {
    screenshots: SCREENSHOTS_ROOT,
  },
};
