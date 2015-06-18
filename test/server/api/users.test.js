'use strict';

var should = require('should');
var supertest = require('supertest');

var server = require('../../../server/server.js');


describe('API - Users', function () {

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

	var newUser = null;
	var newUserData = {
		otherNames: 'Test',
		lastName: 'User',
		email: 'test@test.net',
		password: 'testestest',
		isApproved: 1,
		isAdmin: 0,
		role: 200,
	};

	it('should return all users', function (done) {
		agent
			.get('/api/v1/users/')
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.error);
				should.exist(res.body.data);
				should.exist(res.body.data.users);
				should.exist(res.body.data.users.length);
				done();
			});
	});

	it('should create new user', function (done) {
		agent
			.post('/api/v1/users/')
			.send(newUserData)
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.error);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				var resUser = res.body.data.user;
				resUser.should.have.property('id');
				resUser.otherNames.should.equal(newUserData.otherNames);
				resUser.lastName.should.equal(newUserData.lastName);
				resUser.email.should.equal(newUserData.email);
				resUser.isApproved.should.equal(newUserData.isApproved);
				resUser.isAdmin.should.equal(newUserData.isAdmin);
				resUser.role.should.equal(newUserData.role);
				resUser.should.not.have.property('password');
				// save user for later
				newUser = resUser;
				done();
			});
	});

	it('should read new user', function (done) {
		agent
			.get('/api/v1/users/' + newUser.id)
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.error);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				var resUser = res.body.data.user;
				resUser.id.should.equal(newUser.id);
				resUser.otherNames.should.equal(newUser.otherNames);
				resUser.lastName.should.equal(newUser.lastName);
				resUser.email.should.equal(newUser.email);
				resUser.isApproved.should.equal(newUser.isApproved);
				resUser.isAdmin.should.equal(newUser.isAdmin);
				resUser.role.should.equal(newUser.role);
				resUser.should.not.have.property('password');
				done();
			});
	});

	it('should update new user', function (done) {
		newUser.otherNames = 'Updated';
		newUser.lastName = 'Updated';
		agent
			.put('/api/v1/users/' + newUser.id)
			.send(newUser)
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.error);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				var resUser = res.body.data.user;
				resUser.id.should.equal(newUser.id);
				resUser.otherNames.should.equal(newUser.otherNames);
				resUser.lastName.should.equal(newUser.lastName);
				resUser.email.should.equal(newUser.email);
				resUser.isApproved.should.equal(newUser.isApproved);
				resUser.isAdmin.should.equal(newUser.isAdmin);
				resUser.role.should.equal(newUser.role);
				resUser.should.not.have.property('password');
				done();
			});
	});

	it('should delete new user', function (done) {
		agent
			.delete('/api/v1/users/' + newUser.id)
			.send(newUser)
			.expect(200)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.error);
				should.exist(res.body.data);
				should.exist(res.body.data.user);
				var resUser = res.body.data.user;
				resUser.id.should.equal(newUser.id);
				resUser.otherNames.should.equal(newUser.otherNames);
				resUser.lastName.should.equal(newUser.lastName);
				resUser.email.should.equal(newUser.email);
				resUser.isApproved.should.equal(newUser.isApproved);
				resUser.isAdmin.should.equal(newUser.isAdmin);
				resUser.role.should.equal(newUser.role);
				resUser.should.not.have.property('password');
				done();
			});
	});

	it('should not read new user', function (done) {
		agent
			.get('/api/v1/users/' + newUser.id)
			.expect(404)
			.end(function (err, res) {
				should.not.exist(err);
				should.not.exist(res.body.data);
				should.exist(res.body.error);
				should.exist(res.body.error.message);
				done();
			});
	});

});
