'use strict';

/**
 * Link schema
 */

var shortid = require('shortid');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Link = new Schema({

    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },

    sourceNodeId: String,
    targetNodeId: String,
    backLinkId: String,
    created: {
        at: Date, // datetime stamp
        by: String // author user id
    }

});

module.exports = Link;
