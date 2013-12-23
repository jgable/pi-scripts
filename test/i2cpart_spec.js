
var Part = require('../lib/i2cpart'),
	should = require('should'),
	_ = require('lodash');

describe('I2CPart', function () {
	var part;

	beforeEach(function () {
		part = new Part({
			address: 32
		});
	})

	it('creates an i2c wire', function () {
		should.exist(part.wire);
	});

	it('can read data', function () {
		_.isFunction(part.read).should.equal(true);
	});

	it('can write data', function () {
		_.isFunction(part.send).should.equal(true);
	});
});