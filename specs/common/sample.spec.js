const { Logger } = require('../../utils/Logger');
const { CartPage } = require('../../pages/CartPage');
const { HomePage } = require('../../pages/HomePage');
const { Navigation } = require('../../pages/Navigation');
const { ProductPage } = require('../../pages/ProductPage');

describe('Sample Cross Platform Smoke Suite', function () {
  const logger = new Logger();
  let cartPage;
  let homePage;
  let navigation;
  let productPage;

  before(async function () {
    cartPage = new CartPage(browser);
    homePage = new HomePage(browser);
    navigation = new Navigation(browser);
    productPage = new ProductPage(browser);
    logger.info('WDIO session initialized for sample suite');
  });

  it('launches the app and displays the catalog', async function () {
    const sessionId = browser.sessionId;
    if (!sessionId) {
      throw new Error('Session not initialized');
    }
    await homePage.waitForLoaded();
  });

  it('adds a product to the cart', async function () {
    await homePage.openFirstProduct();
    await productPage.addToCart();
    await navigation.openCart();
    await cartPage.waitForLoaded();

    if (!(await cartPage.hasItem())) {
      throw new Error('Expected cart to contain an item after adding a product');
    }
  });
});
