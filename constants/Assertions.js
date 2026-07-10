class AssertionHelper {
  static expect(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }
}

module.exports = { AssertionHelper };
