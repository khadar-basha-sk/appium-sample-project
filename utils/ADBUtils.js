const { execSync } = require('child_process');

class ADBUtils {
  static run(command) {
    return execSync(`adb ${command}`, { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
  }

  static getDevices() {
    return this.run('devices').split('\n').slice(1).filter(Boolean);
  }
}

module.exports = { ADBUtils };
