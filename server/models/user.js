'use strict';

var shortid = require('shortid');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Schema
 */

var userSchema = new Schema({
	_id: {
	    type: String,
	    unique: true,
	    'default': shortid.generate
	},
	name: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	admin: Boolean,
	created_at: Date,
	updated_at: Date
});


/**
 * Methods
 */

userSchema.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
userSchema.validatePassword = function (password, hash) {
	return bcrypt.compareSync(password, hash);
};


/**
 * Model
 */

var User = mongoose.model('User', userSchema);
module.exports = User;
