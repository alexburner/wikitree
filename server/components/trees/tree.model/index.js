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

    name: String,
    nodes: [Node],
    links: [Link],
    history: {
        currentId: String, // Node id
        prevIds: Array, // [Node ids]
        nextIds: Array // [Node ids]
    },

    created_at: Date,
    updated_at: Date

});


/**
 * Events
 */

Tree.pre('save', function(next) {
    var date = new Date();
    this.created_at = this.created_at || date;
    this.updated_at = date;
    next();
});


/**
 * Model
 */

module.exports = mongoose.model('Tree', Tree);
