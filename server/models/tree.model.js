'use strict';

/**
 * Tree model
 */

var shortid = require('shortid');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NodeSchema = require('./node.schema');
var LinkSchema = require('./link.schema');


/**
 * Schema
 */

var TreeSchema = new Schema({

    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },

    name: String,
    nodes: [NodeSchema],
    links: [LinkSchema],
    history: {
        currentId: String, // Node ID
        prevIds: Array, // [Node IDs]
        nextIds: Array // [Node IDs]
    },

    // owner's id
    userID: String,

    // shareable
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

TreeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


/**
 * Model
 */

module.exports = mongoose.model('Tree', TreeSchema);
