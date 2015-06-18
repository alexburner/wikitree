'use strict';

/**
 * Private users API router
 */

var express = require('express');

var auth = require('../../../lib/auth');
var userEndpoints = require('../../../endpoints/users');


module.exports = function () {
    var router = express.Router();

    function requireSelf(req, res, next) {
        if (req.params.id !== req.user.id) {
            // user isn't self, send error 403
            return next(errors.forbidden());
        } else {
            // continue
            return next();
        }
    }

    router.get('/:id', requireSelf, userEndpoints.get);
    router.put('/:id', requireSelf, userEndpoints.update);
    router.delete('/:id',requireSelf,  userEndpoints.delete);

    return router;
};
