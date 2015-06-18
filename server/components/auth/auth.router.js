'use strict';

var express = require('express');

var authEndpoints = require('./auth.endpoints');


/**
 * Auth router
 */

module.exports = function () {
    var router = express.Router();

    // login, logout, register
    router.post('/api/v1/auth/login', authEndpoints.login);
    router.post('/api/v1/auth/logout', authEndpoints.logout);
    router.post('/api/v1/auth/register', authEndpoints.register);

    // current session user, if any
    router.get('/api/v1/auth/current', authEndpoints.current);

    return router;
};
