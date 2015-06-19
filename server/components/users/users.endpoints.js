'use strict';

/**
 * Users endpoints
 */

var errors = require('../../lib/errors');
var User = require('../../models/user.model');

// GET - read all users
module.exports.readAll = function (req, res, next) {
    User.find().exec()
        .then(function (users) {
            // overwrite passwords
            users.forEach(function (user) {
                user.password = undefined;
            });
            // send users
            return res.json({
                users: users
            });
        })
        .catch(function (err) {
            return next(
                errors.internalServerError(err)
            );
        });
};

// GET - read user
module.exports.read = function (req, res, next) {
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

// POST - create user
module.exports.create = function (req, res, next) {
    User.find({ email: req.body.email }).exec()
        .then(function (user) {
            // user already exist?
            if (user) {
                // send error 409
                return next(
                    errors.conflict('User already exists')
                );
            }
            // create new user
            var newUser = User({
                name: req.body.name,
                email: req.body.email,
                password: User.generateHash(req.body.password)
            });
            // insert user into database
            newUser.save()
                .then(function (user) {
                    // overwrite password
                    user.password = undefined;
                    // return new user
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

// PUT - update user
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

// DELETE - delete user
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
