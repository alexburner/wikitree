'use strict';

/**
 * User model
 */

var shortid = require('shortid');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/**
 * Schema
 */

var User = new Schema({

    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        'default': false
    },

    created_at: Date,
    updated_at: Date

});


/**
 * Events
 */

User.pre('save', function(next) {
    var date = new Date();
    this.created_at = this.created_at || currentDate;
    this.updated_at = currentDate;
    next();
});


/**
 * Statics (exist on Model itself)
 */

User.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};


/**
 * Methods (exist on Model instance)
 */

User.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


/**
 * Model
 */

module.exports = mongoose.model('User', User);
