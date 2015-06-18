'use strict';

var errors = require('./errors');


/**
 * Middleware for authentication & authorization
 */


// require user login
module.exports.requiresLogin = function(req, res, next) {

    // if request isn't authenticated
    if (!req.isAuthenticated()) {
        // send error 401
        return next(errors.unauthorized());
    }

    return next();
};


// require user admin status
module.exports.requiresAdmin = function(req, res, next) {

    // if request user isn't admin
    if (!req.user.admin) {
        // send error 403
        return next(errors.forbidden());
    }

    return next();
};
