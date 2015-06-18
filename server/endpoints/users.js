'use strict';

var _ = require('lodash');

var errors = require('../lib/errors');
var User = require('../models/user');


/**
 * Endpoints
 */

// read user
// GET domain.com/api/v1/users/:id
module.exports.get = function (req, res, next) {
    User.findById(req.params.id).exec()
        .then(function (user) {
            if (!user) {
                // send error 404
                return next(
                    errors.notFound('User not found')
                );
            }
            // overwrite password
            user.password = undefined;
            // send user
            return res.json({
                user: user
            });
        })
        .catch(function (err) {
            return next(
                errors.internalServerError(err)
            );
        });
};

// update user
// PUT domain.com/api/v1/users/:id
module.exports.update = function (req, res, next) {
    User.findById(req.params.id).exec()
        .then(function (user) {
            // user doesn't exist?
            if (!user) {
                // send error 404
                return next(
                    errors.notFound('User not found')
                );
            }
            // update user data from request
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = User.generateHash(req.body.password);
            }
            // update user in database
            user.save()
                .then(function (user) {
                    // overwrite password
                    user.password = undefined;
                    // return updated user
                    return res.json({
                        user: user
                    });
                })
                .catch(function (err) {
                    return next(
                        errors.internalServerError(err)
                    );
                });
        })
        .catch(function (err) {
            return next(
                errors.internalServerError(err)
            );
        });
};

// delete user
// DELETE domain.com/api/v1/users/:id
module.exports.delete = function (req, res, next) {
    User.findById(req.params.id).exec()
        .then(function (user) {
            // user doesn't exist?
            if (!user) {
                // send error 404
                return next(
                    errors.notFound('User not found')
                );
            }
            // delete user from database
            user.remove()
                .then(function () {
                    // overwrite password
                    user.password = undefined;
                    // return deleted user
                    return res.json({
                        user: user
                    });
                })
                .catch(function (err) {
                    return next(
                        errors.internalServerError(err)
                    );
                });
        })
        .catch(function (err) {
            return next(
                errors.internalServerError(err)
            );
        });
};
