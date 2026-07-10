class BaseScreen {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    return true;
  }
}

module.exports = { BaseScreen };
