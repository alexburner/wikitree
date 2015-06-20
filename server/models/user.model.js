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

var UserSchema = new Schema({

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
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },

    // NOT CURRENTLY USED
    admin: {
        type: Boolean,
        'default': false
    },

    // viewable
    'public': {
        type: Boolean,
        'default': false
    },

    createdAt: {
        type: Date,
        'default': Date.now
    },
    updatedAt: {
        type: Date,
        'default': Date.now
    },

    // soft delete
    deleted: {
        type: Boolean,
        'default': false
    }

});


/**
 * Events
 */

UserSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


/**
 * Statics (exist on Model itself)
 */

UserSchema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};


/**
 * Methods (exist on Model instance)
 */

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


/**
 * Model
 */

module.exports = mongoose.model('User', UserSchema);
