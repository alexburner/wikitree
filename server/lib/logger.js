'use strict';

// use console.log for anything you don't want saved in the log file
// otherwise:
// - logger.debug
// - logger.info
// - logger.warn
// - logger.error

var winston = require('winston');

// we'll reconfigure this below
winston.remove(winston.transports.Console);

winston.setLevels({
    debug: 0,
    info:  1,
    warn:  2,
    error: 3
});

winston.addColors({
    debug: 'green',
    info:  'cyan',
    warn:  'yellow',
    error: 'red'
});

winston.add(winston.transports.Console, {
    colorize: true,
    level: 'debug'
});

winston.add(winston.transports.File, {
    name: 'debug-file',
    filename:'log/debug.log',
    level: 'debug'
});

winston.add(winston.transports.File, {
    name: 'info-file',
    filename:'log/info.log',
    level: 'info'
});

winston.add(winston.transports.File, {
    name: 'warn-file',
    filename:'log/warn.log',
    level: 'warn'
});

winston.add(winston.transports.File, {
    name: 'error-file',
    filename:'log/error.log',
    level: 'error'
});

module.exports = winston;
