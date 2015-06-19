'use strict';

/**
 * Auth router
 */

var express = require('express');

var endpoints = require('./auth.endpoints');

module.exports = function () {
    var router = express.Router();

    // login, logout, register
    router.post('/api/v1/auth/login', endpoints.login);
    router.post('/api/v1/auth/logout', endpoints.logout);
    router.post('/api/v1/auth/register', endpoints.register);

    // current session user, if any
    router.get('/api/v1/auth/current', endpoints.current);

    return router;
};
