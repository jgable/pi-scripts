'use strict';

var Part = require('../lib/i2cpart'),
	should = require('should'),
	sinon = require('sinon'),
	_ = require('lodash');

describe('I2CPart', function () {
	var part,
		sandbox;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();

		part = new Part({
			address: 32
		});
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('creates an i2c wire', function () {
		should.exist(part.wire);
	});

	it('can read data', function (done) {
		_.isFunction(part.read).should.equal(true);

		var readSpy = sandbox.spy(part.wire, 'readBytes');

		part.read(9, function () {
			readSpy.called.should.equal(true);

			done();
		});
	});

	it('can send data', function (done) {
		_.isFunction(part.send).should.equal(true);

		var writeSpy = sandbox.spy(part.wire, 'writeBytes');

		part.send(9, 1, function () {
			writeSpy.called.should.equal(true);

			done();
		});
	});
});