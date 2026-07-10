class RandomUtils {
  static generateString(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  static generateEmail(domain = 'example.com') {
    return `${this.generateString(10)}@${domain}`;
  }

  static generateNumber(min = 1000, max = 9999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateAddress() {
    return {
      fullName: `Automation ${this.generateString(6)}`,
      address1: `${this.generateNumber(100, 999)} Test Street`,
      address2: `Suite ${this.generateNumber(1, 99)}`,
      city: 'San Francisco',
      state: 'CA',
      zip: String(this.generateNumber(90000, 99999)),
      country: 'United States',
    };
  }
}

module.exports = { RandomUtils };
