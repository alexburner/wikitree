'use strict';

var passport = require('passport');

var errors = require('../lib/errors');
var User = require('../models/user');


/**
 * Endpoints
 */

// currently authenticated session user, if any
// GET domain.com/api/v1/auth/current
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

// register new user
// POST domain.com/api/v1/auth/register
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
                password: User.generateHash(req.body.password),
                // public, default to normal user
                admin: false
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

// authenticate session
// POST domain.com/api/v1/auth/login
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

// un-authenticate session
// POST domain.com/api/v1/auth/logout
module.exports.logout = function (req, res, next) {
    req.logout();
    return res.json({
        message: 'Success'
    });
};
