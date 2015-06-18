'use strict';

var shortid = require('shortid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Schema
 */

var treeSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    name: String,
    nodes: Array,
    links: Array,
    history: {
        currentId: String,
        prevIdStack: Array,
        nextIdStack: Array
    },
    created_at: Date,
    updated_at: Date
});


/**
 * Events
 */

treeSchema.pre('save', function(next) {
    var date = new Date();
    this.created_at = this.created_at || currentDate;
    this.updated_at = currentDate;
    next();
});


/**
 * Model
 */

var Tree = mongoose.model('Tree', treeSchema);
module.exports = Tree;
