const { LoginPage } = require('../../pages/LoginPage');
const { HomePage } = require('../../pages/HomePage');
const { MenuPage } = require('../../pages/MenuPage');
const { Navigation } = require('../../pages/Navigation');
const { TestDataHelper } = require('../../helpers/TestDataHelper');
const { Logger } = require('../../utils/Logger');

const testData = TestDataHelper.loadJson('login.json');

describe('Android My Demo App Login Scenarios', function () {
  const logger = new Logger();
  let homePage;
  let loginPage;
  let menuPage;
  let navigation;

  before(async function () {
    homePage = new HomePage(browser);
    loginPage = new LoginPage(browser);
    menuPage = new MenuPage(browser);
    navigation = new Navigation(browser);
    logger.info('Android My Demo App login suite initialized');
  });

  it('creates a valid Android session and loads the product catalog', async function () {
    if (!browser.sessionId) {
      throw new Error('Session not initialized');
    }
    await homePage.waitForLoaded();
  });

  it('validates login with external credentials', async function () {
    await navigation.openMenu();
    await menuPage.openLogin();
    await loginPage.waitForLoginScreen();
    await loginPage.login(testData.valid.username, testData.valid.password);
    await homePage.waitForLoaded();
  });
});
