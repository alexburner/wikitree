'use strict';

/**
 * Shares router
 */

var express = require('express');

var auth = require('../../lib/auth');
var endpoints = require('./shares.endpoints');

module.exports = function () {
    var router = express.Router();

    return router;
};
