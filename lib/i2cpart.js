var _ = require('lodash'),
	// For testing on non raspberry pi devices
	Wire = require('./i2c-fake');
	//Wire = require('i2c');

var I2CPart = function (config) {
	this.initialize(config);
};

_.extend(I2CPart.prototype, {
	initialize: function (config) {
		_.extend(this, _.pick(config, 'address'));

		this.wire = new Wire(this.address);
	},

	read: function(register, length, done) {
		this.wire.readBytes(register, length, done);
	},

	send: function (register, values) {
		this.wire.writeBytes(register, values);
	}
});

module.exports = I2CPart;