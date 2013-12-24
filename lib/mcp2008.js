'use strict';

var _ = require('lodash'),
	I2CPart = require('./i2cpart'),
	Pins = require('./mcp-pins');

var MCP2008 = function (config) {
	I2CPart.call(this, config);
};

_.extend(MCP2008.prototype, I2CPart.prototype);

_.extend(MCP2008.prototype, {
	initialize: function (config) {
		I2CPart.prototype.initialize.apply(this, _.toArray(arguments));

		this._pins = new Pins({
			mcp: this,
			register: 9,
			numPins: 8
		});
	},

	pins: function () {
		// Pass through to the _pins.select method
		return this._pins.select.apply(this._pins, _.toArray(arguments));
	}
});

module.exports = MCP2008;