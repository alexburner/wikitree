'use strict';

var chalk = require('chalk');

var logger = require('../lib/logger');

/**
 * Graceful shutdown
 */

// when the process is killed, this will close the server, refusing all new requests
// but continuing to process existing ones, calling the callback when finished

// new!
// force killing current connections also
// because server was taking forever to exit
// (so, is this even needed anymore? TBD)
// http://stackoverflow.com/questions/14626636

module.exports = function (httpServer, httpsServer, mongoose) {

    var isShutDown = false;
    var sockets = {};

    function handleConnection(socket) {

        // add newly connected socket
        var key = socket.remoteAddress + ':' + socket.remotePort;
        sockets[key] = socket;

        // remove socket when it closes
        socket.once('close', function () {
            delete sockets[key];
        });

    }

    function makeHandleShutdown(signal) {
        return function handleShutdown() {

            if (isShutDown) return;
            else isShutDown = true;

            console.log(); // for ctrl+C gobbledygook

            logger.warn(chalk.bold.yellow(signal + ' signal, shutting down servers...'));

            // close http server
            httpServer.close(function () {
                logger.warn(chalk.bold.yellow('HTTP redirect server shut down'));
            });

            // close https server
            httpsServer.close(function () {

                logger.warn(chalk.bold.yellow('HTTPS app server shut down'));

                // shutdown database
                mongoose.disconnect(function (err) {
                    if (!err) {
                        logger.warn(chalk.bold.yellow('Database shut down'));
                    } else {
                        logger.error(chalk.bold.red('Database failed to shut down'));
                        logger.error(err);
                    }
                });

            });

            // destroy remaining sockets
            Object.keys(sockets).forEach(function (key) {
                sockets[key].destroy();
            });

        };
    };

    // listen for server connections
    httpServer.on('connection', handleConnection);
    httpsServer.on('connection', handleConnection);

    // listen for shutdown signals
    process.on('SIGTERM', makeHandleShutdown('SIGTERM'));
    process.on('SIGINT', makeHandleShutdown('SIGINT'));

};
