'use strict';

/**
 * Node schema
 */

var shortid = require('shortid');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Node = new Schema({

    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },

    type: String, // article, category, search, note
    name: String,
    title: String, // for article and category
    query: String, // for search
    body: String, // for note
    created: {
        at: Date, // datetime stamp
        by: String // author user id
    },

    // D3 attributes
    index: Number,
    x: Number,
    y: Number,
    px: Number,
    py: Number,
    fixed: Boolean,
    weight: Number

});

module.exports = Node;
