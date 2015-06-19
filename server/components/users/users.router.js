'use strict';

/**
 * Users router
 */

var express = require('express');

var auth = require('../../lib/auth');
var endpoints = require('./users.endpoints');

module.exports = function () {
    var router = express.Router();

    return router;
};
