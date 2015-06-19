'use strict';

/**
 * Tree model
 */

var shortid = require('shortid');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Node = require('./node.schema');
var Link = require('./link.schema');


/**
 * Schema
 */

var Tree = new Schema({

    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },

    'public': {
        type: Boolean,
        'default': false
    },

    name: String,
    nodes: [Node],
    links: [Link],
    history: {
        currentId: String, // Node id
        prevIds: Array, // [Node ids]
        nextIds: Array // [Node ids]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});


/**
 * Events
 */

Tree.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


/**
 * Model
 */

module.exports = mongoose.model('Tree', Tree);
