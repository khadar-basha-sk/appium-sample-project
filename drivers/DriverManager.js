class DriverManager {
  constructor() {
    if (DriverManager.instance) {
      return DriverManager.instance;
    }

    this.driver = null;
    DriverManager.instance = this;
  }

  setDriver(driver) {
    this.driver = driver;
  }

  getDriver() {
    return this.driver;
  }

  async quit() {
    if (this.driver) {
      await this.driver.deleteSession();
      this.driver = null;
    }
  }
}

module.exports = { DriverManager };
