'use strict';

var express = require('express');

var auth = require('../../lib/auth');
var selfEndpoints = require('./self.endpoints');


/**
 * Self router
 */

module.exports = function () {
    var router = express.Router();

    // must be authenticated past this point
    router.use('/api/v1/self', auth.requiresLogin);

    // read, update, delete self
    router.get('/api/v1/self', selfEndpoints.read);
    router.put('/api/v1/self', selfEndpoints.update);
    router.delete('/api/v1/self',  selfEndpoints.delete);

    return router;
};
