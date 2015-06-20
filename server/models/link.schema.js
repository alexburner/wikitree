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

    sourceId: String, // Node ID
    targetId: String, // Node ID
    firstLinkId: String, // if this is a linkback

    // authorship
    created: {
        at: Date,
        by: String // User ID
    },
    updated: {
        at: Date,
        by: String // User ID
    },

    // soft delete
    deleted: {
        type: Boolean,
        'default': false
    }

});

module.exports = LinkSchema;
