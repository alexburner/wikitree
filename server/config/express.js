'use strict';

/**
 * Express configuration
 */

var fs = require('fs');
var path = require('path');

var express = require('express');
var passport = require('passport');
var morgan = require('morgan');
var helmet = require('helmet');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var compress = require('compression');
var glob = require('glob');

var env = require('./env');
var logger = require('../lib/logger');
var errors = require('../lib/errors');

module.exports = function () {
    var app = express();


    /**
     * Middleware fiesta
     */

    // log requests
    app.use(morgan('dev'));
    app.use(morgan('combined', {
        stream: fs.createWriteStream(
            path.resolve(
                __dirname,
                '..',
                '..',
                'log/morgan.log'
            ),
            { flags: 'a' }
        )
    }));

    // enable gzip
    app.use(compress());

    // serve favicon
    app.use(favicon(path.resolve(
        __dirname, '..', '..', 'client/favicon.ico'
    )));

    // parse all the things
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(bodyParser.urlencoded({ extended: true }));

    // express session
    app.use(session({
        secret: env.session_secret,
        saveUninitialized: true,
        resave: true
    }));

    // passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // use helmet to secure express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');


    /**
     * Routes
     */

    // static files
    app.use('/',
        express.static(
            path.resolve(
                __dirname,
                '..',
                '..',
                'client'
            )
        )
    );

    // component routers
    glob.sync(__dirname + '/../components/**/*.router.js')
        .forEach(function (filename) {
            // add component router to app
            app.use('/', require(filename)());
        });

    // API 404
    // (any unhandled api requests end here)
    app.use('/api/v1', function (req, res, next) {
        next(errors.notFound());
    });

    // CATCH-ALL
    // (any unhandled requests end here)
    // send them the client app root file
    app.use('*',
        function (req, res) {
            return res.sendFile(
                path.resolve(
                    __dirname,
                    '..',
                    '..',
                    'client/index.html'
                )
            );
        }
    );

    // add http error handler
    app.use(errors());

    return app;

};
