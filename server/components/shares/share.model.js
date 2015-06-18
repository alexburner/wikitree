'use strict';

/**
 * Share model
 */

var shortid = require('shortid');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/**
 * Schema
 */

var Share = new Schema({

    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },

    fromUserId: String,
    fromTreeId: String,
    toUserId: String,
    toTreeId: String,

    created_at: Date,
    updated_at: Date

});


/**
 * Events
 */

Share.pre('save', function(next) {
    var date = new Date();
    this.created_at = this.created_at || date;
    this.updated_at = date;
    next();
});


/**
 * Model
 */

module.exports = mongoose.model('Share', Share);
