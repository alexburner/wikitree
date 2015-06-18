'use strict';

/**
 * Main request router
 */

var path = require('path');

var express = require('express');

var publicRouter = require('./public');
var privateRouter = require('./private');

module.exports = function () {
    var router = express.Router();

    // static files
    router.use('/',
        express.static(
            path.resolve(
                __dirname,
                '..',
                '..',
                'client'
            )
        )
    );

    // public requests
    router.use('/', publicRouter());

    // private requests
    router.use('/', privateRouter());

    // CATCH-ALL
    // (any unhandled requests end here)
    // send them the client app root file
    router.use('*',
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

    return router;
};
