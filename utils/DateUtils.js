class DateUtils {
  static now() {
    return new Date().toISOString();
  }
}

module.exports = { DateUtils };
