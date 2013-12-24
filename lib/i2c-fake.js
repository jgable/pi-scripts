'use strict';

var sinon = require('sinon'),
	_ = require('lodash');

var Wire = function () { };

Wire.prototype.readBytes = function (register, length, done) {
	_.defer(function () { done(); });
};

Wire.prototype.writeBytes = function (register, value, done) {
	_.defer(function () { done(); });
};

module.exports = Wire;