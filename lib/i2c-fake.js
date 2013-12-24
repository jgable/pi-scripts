'use strict';

var Wire = function () {

};

Wire.prototype.readBytes = function (register, length, done) {
	setTimeout(function () { done(); }, 200);
};

Wire.prototype.writeBytes = function (register, value) {
	return;
};

module.exports = Wire;