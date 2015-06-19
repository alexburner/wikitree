'use strict';

/**
 * Link schema
 */

var shortid = require('shortid');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LinkSchema = new Schema({

    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },

    sourceNodeId: String,
    targetNodeId: String,
    firstLinkId: String, // if this is a linkback

    // authorship
    created: {
        at: Date,
        by: String // User ID
    },
    updated: {
        at: Date,
        by: String // User ID
    }

});

module.exports = LinkSchema;
