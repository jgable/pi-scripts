'use strict';

var _ = require('lodash');

var Pins = function (config) {
	this.initialize(config);
};

_.extend(Pins.prototype, {
	initialize: function (config) {
		config = _.defaults(config || {}, {
			register: 9,
			numPins: 8
		});

		_.extend(this, _.pick(config, 'mcp', 'register', 'numPins', 'values'));

		// Check for mcp
		if (!this.mcp) {
			throw new Error('Must pass mcp value in the config');
		}

		// Create the allPins array for quick use
		this.allPins = _.range(1, this.numPins + 1);

		// Set the flags for each pin for quick use
		this.flags = _.reduce(this.allPins, function (flags, pin) {

			// 1 = 1 << 0 = 1 = 1
			// 2 = 1 << 1 = 2 = 10
			// 3 = 1 << 2 = 4 = 100
			// 4 = 1 << 3 = 8 = 1000
			// etc.
			flags[pin] = 1 << (pin-1);

			return flags;
		}, {});

		this.values = this.values || 0;
	},

	setCurrentValues: function(values) {
		this.values = values;
	},

	select: function () {
		var self = this,
			pins = _.toArray(arguments);

		if (pins.length === 0) {
			// Default to all pins
			pins = this.allPins;
		}

		// Validate the pins
		_.each(pins, function (pin) {
			if (!_.isNumber(pin)) {
				throw new Error('Pins must be integers: ' + pin);
			}

			if (pin < 1 || pin > self.numPins) {
				throw new Error('Pin is out of range: ' + pin);
			}
		});

		return {
			pins: pins,

			on: function () {
				// OR the values of the flag with the new pin
				var newValues = _.reduce(pins, function (values, pin) {
					return values | self.flags[pin];
				}, self.values);

				self.mcp.send(self.register, newValues);

				self.values = newValues;

				return self;
			},

			off: function () {
				// AND the _negative_ values of the flag with the new pin
				var newValues = _.reduce(pins, function (values, pin) {
					return values & (~self.flags[pin]);
				}, self.values);

				self.mcp.send(self.register, newValues);

				self.values = newValues;

				return self;
			}
		};
	}
});

module.exports = Pins;