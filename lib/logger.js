const winston = require('winston');
const path = require('path');
const split = require('split');
const morgan = require("morgan");
require('winston-daily-rotate-file');

// declare var process: any

const { combine, timestamp, label, printf, errors } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

// Ignore log messages if they have { private: true }
const ignorePrivate = winston.format((info, opts) => {
    if (info.private) { return false; }
    return info;
});

const customFormat = combine(
    errors({ stack: true }),
    ignorePrivate(),
    timestamp(),
    winston.format.splat(),
    winston.format.simple(),
    // winston.format.colorize(),
    myFormat
);

const logger = winston.createLogger({
    format: customFormat,
    // defaultMeta: { service: 'user-service' },
    transports: [
        // new winston.transports.File({
        //     filename: path.join(process.mainModule.filename, '..', '..', 'logs', 'combined.log'),
        //     maxsize: 52428800, // 50MB
        //     maxFiles: 100,
        // }),
        new winston.transports.DailyRotateFile({
            dirname: path.join(__dirname, '..', 'logs'),
            filename: 'application=%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH-mm', // Rotate logs every minute
            zippedArchive: true,
            maxSize: '50m',
            maxFiles: '10',
        }),
    ],
});


logger.add(new winston.transports.Console({
    format: customFormat,
}));

const loggerStream = split().on('data', function (message) {
    logger.info(message);
});

const logMorgan = morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms', { stream: loggerStream })

module.exports = {
    logger,
    logMorgan
};