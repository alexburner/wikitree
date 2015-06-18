'use strict';

/**
 * Public request router
 */

var express = require('express');

var apiRouter = require('./api');

module.exports = function () {
    var router = express.Router();

    // domain.com/api/v1/...
    router.use('/api/v1', apiRouter());

    return router;
};
