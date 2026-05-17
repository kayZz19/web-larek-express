// middlewares/logger.ts
const winston = require("winston");
const expressWinston = require("express-winston");
const path = require("path");

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../../request.log"),
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../../error.log"),
    }),
  ],
  format: winston.format.json(),
});
