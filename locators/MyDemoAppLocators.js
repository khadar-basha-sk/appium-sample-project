const packageName = 'com.saucelabs.mydemoapp.android';
const id = (resourceId) => `id=${packageName}:id/${resourceId}`;
const text = (value) => `android=new UiSelector().text("${value}")`;
const textContains = (value) => `android=new UiSelector().textContains("${value}")`;

const MyDemoAppLocators = {
  packageName,
  common: {
    title: [id('mTvTitle'), id('titleTV')],
    menuButton: [id('menuIV'), '~View menu'],
    cartButton: [id('cartIV'), id('cartBt'), '~View cart'],
  },
  login: {
    username: [id('nameET'), text('Username')],
    password: [id('passwordET'), text('Password')],
    loginButton: [id('loginBtn'), text('Login')],
    loginTitle: [id('loginTV'), textContains('Login')],
    usernameRequiredError: [id('usernameErrorTV'), text('Username is required')],
    passwordRequiredError: [id('passwordErrorTV'), text('Password is required')],
  },
  home: {
    productsTitle: [id('productTV'), text('Products')],
    productList: [id('productRV')],
    firstProduct: [id('productIV'), textContains('Sauce Labs')],
    sortButton: [id('sortIV')],
  },
  product: {
    title: [id('titleTV'), textContains('Sauce Labs')],
    price: [id('priceTV')],
    description: [id('descTV')],
    addToCartButton: [id('cartBt'), id('addToCartLL'), text('Add to cart')],
    cartBadge: [id('cartTV')],
  },
  cart: {
    title: [id('mTvTitle'), text('My Cart')],
    itemName: [id('titleTV')],
    itemPrice: [id('priceTV')],
    proceedToCheckoutButton: [id('cartBt'), text('Proceed To Checkout')],
    emptyCartMessage: [id('noItemTitleTV'), textContains('cart is empty')],
  },
  checkout: {
    checkoutTitle: [id('checkoutTitleTV'), text('Checkout')],
    fullName: [id('fullNameET')],
    address1: [id('address1ET')],
    address2: [id('address2ET')],
    city: [id('cityET')],
    state: [id('stateET')],
    zip: [id('zipET')],
    country: [id('countryET')],
    toPaymentButton: [id('paymentBtn'), text('To Payment')],
    cardNumber: [id('cardNumberET')],
    reviewOrderButton: [id('paymentBtn'), text('Review Order')],
    placeOrderButton: [id('paymentBtn'), text('Place Order')],
    completeMessage: [id('completeTV'), textContains('Checkout Complete')],
  },
  menu: {
    drawer: [id('drawerMenu')],
    catalog: [text('Catalog')],
    webview: [text('Webview')],
    login: [text('Log In'), text('Login')],
    logout: [text('Log Out'), text('Logout')],
    resetAppState: [text('Reset App State')],
    closeButton: [id('closeBt')],
  },
};

module.exports = { MyDemoAppLocators, id, text, textContains };
