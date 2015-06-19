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

var ShareSchema = new Schema({

    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },

    fromUserId: String,
    fromTreeId: String,
    toUserId: String,
    toTreeId: String,

    createdAt: {
        type: Date,
        'default': Date.now
    },
    updatedAt: {
        type: Date,
        'default': Date.now
    }

});


/**
 * Events
 */

ShareSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


/**
 * Model
 */

module.exports = mongoose.model('Share', ShareSchema);
