const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.printf((info) => JSON.stringify(info).replace(/\\n/g, '\\n').replace(/\\t/g, '\\t')),
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
