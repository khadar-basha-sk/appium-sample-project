const winston = require('winston');
const fs = require('fs');
const path = require('path');
const { LOGS_ROOT } = require('../config/constants/FrameworkConstants');

class Logger {
  constructor(serviceName = 'mobile-framework') {
    fs.mkdirSync(LOGS_ROOT, { recursive: true });
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({ filename: path.join(LOGS_ROOT, 'execution.log') }),
        new winston.transports.File({ filename: path.join(LOGS_ROOT, 'error.log'), level: 'error' }),
        new winston.transports.Console({ format: winston.format.simple() }),
      ],
    });
    this.serviceName = serviceName;
  }

  info(message) {
    this.logger.info(message, { service: this.serviceName });
  }

  warn(message) {
    this.logger.warn(message, { service: this.serviceName });
  }

  error(message, error) {
    this.logger.error(message, { service: this.serviceName, error });
  }
}

module.exports = { Logger };
