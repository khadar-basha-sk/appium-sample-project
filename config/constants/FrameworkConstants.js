const path = require('path');

const projectRoot = path.resolve(__dirname, '../..');

module.exports = {
  PROJECT_ROOT: projectRoot,
  APPS_ROOT: path.join(projectRoot, 'apps'),
  CONFIG_ROOT: path.join(projectRoot, 'config'),
  REPORTS_ROOT: path.join(projectRoot, 'reports'),
  LOGS_ROOT: path.join(projectRoot, 'logs'),
  SCREENSHOTS_ROOT: path.join(projectRoot, 'screenshots'),
  VIDEOS_ROOT: path.join(projectRoot, 'videos'),
  FIXTURES_ROOT: path.join(projectRoot, 'fixtures'),
  DEFAULT_ENVIRONMENT: 'local',
  DEFAULT_PLATFORM: 'android',
  DEFAULT_DEVICE: 'emulator',
  DEFAULT_APP: 'facebook',
  DEFAULT_AUTOMATION: 'UIAutomator2',
  DEFAULT_APPIUM_PORT: 4723,
  DEFAULT_MAX_INSTANCES: 1,
};
