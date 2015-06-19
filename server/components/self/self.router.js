'use strict';

/**
 * Self router
 */

var express = require('express');

var auth = require('../../lib/auth');
var endpoints = require('./self.endpoints');

module.exports = function () {
    var router = express.Router();

    // must be authenticated past this point
    router.use('/api/v1/self', auth.requiresLogin);

    // read, update, delete self
    router.get('/api/v1/self', endpoints.read);
    router.put('/api/v1/self', endpoints.update);
    router.delete('/api/v1/self', endpoints.delete);

    return router;
};
