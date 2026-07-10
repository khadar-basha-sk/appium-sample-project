module.exports = {
  android: {
    emulator: {
      automationName: 'UIAutomator2',
      deviceName: 'Pixel 4',
      platformVersion: '14',
      appPackage: 'com.example.android',
      appActivity: '.MainActivity',
    },
    'real-device': {
      automationName: 'UIAutomator2',
      deviceName: 'Samsung_Galaxy',
      platformVersion: '14',
      appPackage: 'com.example.android',
      appActivity: '.MainActivity',
    },
  },
  ios: {
    simulator: {
      automationName: 'XCUITest',
      deviceName: 'iPhone_15',
      platformVersion: '17',
      bundleId: 'com.example.ios',
    },
    'real-device': {
      automationName: 'XCUITest',
      deviceName: 'iPhone_15',
      platformVersion: '17',
      bundleId: 'com.example.ios',
    },
  },
};
