'use strict';

var should = require('should');
var supertest = require('supertest');

var server = require('../../../server/server.js');


describe('API - Learners', function () {

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

	/**
	 * Authentication tests
	 */

	var admin = null;
	var adminCredentials = {
		email: 'root',
		password: 'Banana23123'
	};

	it('should respond with 401 to unauthed calls', function (done) {
		agent
			.get('/api/v1/users')
			.expect(401)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.data);
				should.exist(res.body.error);
				should.exist(res.body.error.message);
				done();
			});
	});

	it('should authenticate agent as admin', function (done) {
		agent
			.post('/api/v1/auth/login')
			.send(adminCredentials)
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				// save admin for later
				admin = res.body.data.user;
				done();
			});
	});

	/**
	 * Main tests
	 */



	 /**
	  *
	  *	TODO
	  *
	  * get CRUD worker for learners and such
	  * so content can be inserted and tested and deleted
	  *
	  * or hmmmmmm
	  * how to work this
	  * so much content contingent for tests
	  * can i run a sql file?
	  *
	  *
	  */



});
