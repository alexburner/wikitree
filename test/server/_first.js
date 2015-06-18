'use strict';

var should = require('should');
var supertest = require('supertest');

var server = require('../../server/server.js');


describe('1st - Server', function () {

	/**
	 * Server test
	 */

	var agent = null;

	it('should have running server', function (done) {
		server
			.then(function (app) {
				agent = supertest.agent(app);
				done();
			})
			.catch(function (err) {
				done(err);
			});
	});

});