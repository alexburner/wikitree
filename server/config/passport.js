'use strict';

/**
 * Passport configuration
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var errors = require('../lib/errors');
var User = require('../models/user.model');


module.exports = function () {

    /**
     * Session setup
     */

    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).exec()
            .then(function (user) {
                if (!user) {
                    return done(new Error('User with id "' + id + '" could not be found'));
                }
                return done(null, user);
            })
            .catch(function (err) {
                done(err, null);
            });
    });


    /**
     * Strategy - Local login
     * structured to return api-friendly errors
     */

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called "local"
    passport.use('local-api', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {

        // find a user whose email matches the one in the form
        // we're checking to see if user trying to login exists
        User.find({ email: email }).exec()
            .then(function (user) {

                // if no user is found
                if (!user) {
                    // error 422
                    return done(
                        errors.unprocessableEntity(
                            'The user\'s email or password was incorrect'
                        )
                    );
                }

                // if user is found but password is wrong
                if (!user.validatePassword(password)) {
                    // error 422
                    return done(
                        errors.unprocessableEntity(
                            'The user\'s email or password was incorrect'
                        )
                    );
                }

                // all is well, return successful user
                return done(null, user);

            })
            .catch(function (err) {
                return done(err);
            });
    }));

};
