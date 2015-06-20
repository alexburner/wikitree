'use strict';

/**
 * Self endpoints
 */

var errors = require('../../lib/errors');
var User = require('../../models/user.model');

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
     *
     *
     *  update
     *  - check if user has any shares
     *  - if yes, soft delete user & trees
     *  - if no, hard delete user & trees
     *
     *  OR
     *  do we always keep trees?
     *  to add to our big corpus of user interaction?
     *  but, do we really want data
     *  from the sort of people
     *  that delete themselves?
     *
     *  besides
     *  they deleted themselves
     *  let them be, right?
     *  focus on active users
     *
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
