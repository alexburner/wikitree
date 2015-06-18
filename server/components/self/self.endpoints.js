'use strict';

var errors = require('../../lib/errors');
var User = require('../users/user.model');


/**
 * Self endpoints
 */

// GET - read self
module.exports.read = function (req, res, next) {
    User.findById(req.user.id).exec()
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

// PUT - update self
module.exports.update = function (req, res, next) {
    User.findById(req.user.id).exec()
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

// DELETE - delete self
module.exports.delete = function (req, res, next) {

    /**
     * TODO remove user AND any trees(?)
     */

    return;

    User.findById(req.user.id).exec()
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
