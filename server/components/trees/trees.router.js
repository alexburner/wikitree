'use strict';

/**
 * Trees router
 */

var express = require('express');

var auth = require('../../lib/auth');
var endpoints = require('./trees.endpoints');

module.exports = function () {
    var router = express.Router();

    return router;
};
