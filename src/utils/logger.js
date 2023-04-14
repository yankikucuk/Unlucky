import winston from 'winston';

const logger = winston
  .createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ],
  })
  .add(new winston.transports.Console());
export default logger;
