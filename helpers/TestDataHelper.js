const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const xlsx = require('xlsx');
const { FIXTURES_ROOT } = require('../config/constants/FrameworkConstants');

class TestDataHelper {
  static load(fileName, options = {}) {
    const extension = path.extname(fileName).toLowerCase();
    switch (extension) {
      case '.json':
        return this.loadJson(fileName);
      case '.csv':
        return this.loadCsv(fileName);
      case '.xlsx':
      case '.xls':
        return this.loadExcel(fileName, options.sheetName);
      case '.yaml':
      case '.yml':
        return this.loadYaml(fileName);
      case '.properties':
        return this.loadProperties(fileName);
      default:
        throw new Error(`Unsupported test data file type: ${extension}`);
    }
  }

  static loadJson(fileName) {
    const filePath = path.join(FIXTURES_ROOT, 'json', fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  static loadCsv(fileName) {
    const filePath = path.join(FIXTURES_ROOT, 'csv', fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    return parse(content, { columns: true, skip_empty_lines: true });
  }

  static loadExcel(fileName, sheetName = 1) {
    const filePath = path.join(FIXTURES_ROOT, 'excel', fileName);
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[sheetName - 1] || workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(worksheet);
  }

  static loadYaml(fileName) {
    const filePath = path.join(FIXTURES_ROOT, 'yaml', fileName);
    return this.parseKeyValueDocument(fs.readFileSync(filePath, 'utf8'));
  }

  static loadProperties(fileName) {
    const filePath = path.join(FIXTURES_ROOT, 'properties', fileName);
    return this.parseKeyValueDocument(fs.readFileSync(filePath, 'utf8'), '=');
  }

  static getCredentials(prefix = 'APP') {
    return {
      username: process.env[`${prefix}_USERNAME`],
      password: process.env[`${prefix}_PASSWORD`],
    };
  }

  static parseKeyValueDocument(content, separator = ':') {
    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .reduce((data, line) => {
        const index = line.indexOf(separator);
        if (index === -1) {
          return data;
        }

        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
        return { ...data, [key]: value };
      }, {});
  }
}

module.exports = { TestDataHelper };
