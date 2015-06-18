'use strict';

var logger = require('./lib/logger');

logger.info('-------------------------------------');
logger.info(' Starting up servers...');
logger.info('-------------------------------------');

var env = require('./config/env');

var http = require('http');
var https = require('https');

var chalk = require('chalk');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var passportConfig = require('./config/passport');
var expressConfig = require('./config/express');
var shutdownConfig = require('./config/shutdown');


// expose promise for testing
module.exports = new Promise(function (resolve, reject) {
    mongoose.connect(env.mongo.uri, function (err) {
        if (!err) {

            /**
             * DB success
             */

            logger.info(chalk.bold.green('Database connection successful'));

            // setup passport & express
            var pass = passportConfig();
            var app = expressConfig();

            // create HTTPS server and pass express app as handler
            var httpsServer = https.createServer({
                key: env.https.private_key,
                cert: env.https.public_cert
            }, app);

            // create HTTP server for forwarding to HTTPS
            var httpServer = http.createServer(function (req, res) {
                logger.info(chalk.bold.yellow('Redirecting HTTP request: ' + req.url));
                var redirectUrl = 'https://' + env.domain;
                if (env.https.port !== 443) {
                    redirectUrl += ':' + env.https.port;
                }
                redirectUrl += req.url;
                res.writeHead(301, {
                    'Location': redirectUrl
                });
                return res.end();
            });

            // start listening for HTTPS
            httpsServer.listen(env.https.port, function () {
                logger.info(
                    chalk.bold.blue(
                        'HTTPS app server listening on port ' +
                        httpsServer.address().port
                    )
                );
            });

            // start listening for HTTP
            httpServer.listen(env.http.port, function () {
                logger.info(
                    chalk.bold.blue(
                        'HTTP redirect server listening on port ' +
                        httpServer.address().port
                    )
                );
            });

            // setup graceful shutdown
            shutdownConfig(httpServer, httpsServer, mongoose);

            // resolve promise with express app
            resolve(app);

        } else {

            /**
             * DB failure
             */

            console.error(chalk.bold.red('Unable to connect to database:', err));
            console.error(chalk.bold.red('Server startup failed'));

            // reject promise with error
            reject(err);

        }
    });
});
