'use strict';

var _ = require('lodash');

var errors = require('../lib/errors');
var User = require('../models/user');


/**
 * Endpoints
 */

// get all users
// GET domain.com/api/v1/users/
module.exports.getAll = function (req, res, next) {
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

// CRUD - read user
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

// CRUD - create user
// POST domain.com/api/v1/users/
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
            	password: User.generateHash(req.body.password),
				// this is admin only endpoint, safe to set this
            	admin: req.body.isAdmin
            });
            // insert user into database
            newUser.save().exec()
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

// CRUD - update user
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
            // this is admin only endpoint, safe to set this:
            user.admin = req.body.admin;
            // update user in database
            user.save().exec()
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

// CRUD - delete user
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
            user.remove().exec()
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
