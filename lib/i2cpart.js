'use strict';

var _ = require('lodash'),
	Wire;

try {
	Wire = require('i2c');
} catch (e) {
	console.warn('WARN: Using i2c-fake because i2c module not found');
	Wire = require('./i2c-fake');
}

var I2CPart = function (config) {
	this.initialize(config);
};

_.extend(I2CPart.prototype, {
	initialize: function (config) {
		_.extend(this, _.pick(config, 'address'));

		this.wire = new Wire(this.address);
	},

	read: function(register, length, done) {
		if (_.isFunction(length)) {
			done = length;
			length = 1;
		}

		this.wire.readBytes(register, length, done);
	},

	send: function (register, values, done) {
		if (!_.isArray(values)) {
			values = [values];
		}
		
		this.wire.writeBytes(register, values, done);
	}
});

module.exports = I2CPart;