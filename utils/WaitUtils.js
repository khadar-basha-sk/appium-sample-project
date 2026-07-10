class WaitUtils {
  static async waitUntil(condition, timeout = 20000, interval = 1000) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if (await condition()) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    return false;
  }
}

module.exports = { WaitUtils };
