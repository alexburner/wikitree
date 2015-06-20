'use strict';

/**
 * Node schema
 */

var shortid = require('shortid');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NodeSchema = new Schema({

    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },

    type: String, // article|category|search|note
    name: String, // for all types
    title: String, // for article|category
    query: String, // for search
    body: String, // for note

    // D3 attributes
    index: Number,
    x: Number,
    y: Number,
    px: Number,
    py: Number,
    fixed: Boolean,
    weight: Number,

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


module.exports = NodeSchema;
