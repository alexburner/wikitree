'use strict';

/**
 * Auth endpoints
 */

var passport = require('passport');

var errors = require('../../lib/errors');
var User = require('../../models/user.model');

// POST - authenticate session
module.exports.login = function (req, res, next) {
    // authenticate user with passport
    passport.authenticate(
        'local-api',
        function (err, user, info) {
            if (err) {
                // general error
                return next(err);
            }
            // establish user session
            req.login(user, function (err) {
                if (err) {
                    // general error
                    return next(err);
                }
                // success! return session user
                user.password = undefined;
                return res.json({
                    user: user
                });
            });
        }
    )(req, res, next);
};

// POST - unauthenticate session
module.exports.logout = function (req, res, next) {
    req.logout();
    return res.json({
        message: 'Success'
    });
};

// POST - register new user
module.exports.register = function (req, res, next) {
    // try to find user by posted email address
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

// GET - read currently authenticated session user, if any
module.exports.current = function (req, res, next) {
    // grab user from session
    var user = req.user;
    // overwrite password
    if (user && user.password) {
        user.password = undefined;
    }
    // send json
    return res.json({
        user: user
    });
};
