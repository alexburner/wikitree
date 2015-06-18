'use strict';

var shortid = require('shortid');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Schema
 */

var userSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});


/**
 * Events
 */

userSchema.pre('save', function(next) {
    var date = new Date();
    this.created_at = this.created_at || currentDate;
    this.updated_at = currentDate;
    next();
});


/**
 * Statics (exist on Model itself)
 */

userSchema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};


/**
 * Methods (exist on Model instance)
 */

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


/**
 * Model
 */

var User = mongoose.model('User', userSchema);
module.exports = User;
