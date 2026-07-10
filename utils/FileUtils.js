const fs = require('fs');
const path = require('path');

class FileUtils {
  static readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  static ensureDirectory(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
    return dirPath;
  }

  static writeFile(filePath, content) {
    this.ensureDirectory(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    return filePath;
  }
}

module.exports = { FileUtils };
