var MCP2008 = require('./lib/mcp2008'),
	Promise = require('bluebird');

var chip1 = new MCP2008({
		address: 0x20
	});

Promise.resolve().then(function () {
	chip1.pins().off();
	chip1.pins(1).on();
}).delay(500).then(function () {
	chip1.pins(1).off();
	chip1.pins(2).on();
}).delay(500).then(function () {
	chip1.pins().off();
	chip1.pins(3).on();
}).delay(500).then(function () {
	chip1.pins().off();
	chip1.pins(1,2,3).on();
}).delay(200).then(function () {
	chip1.pins(1,2,3).off();
}).delay(200).then(function () {
	chip1.pins(1,2,3).on();
}).delay(200).then(function () {
	chip1.pins(1,2,3).off();
}).delay(200).then(function () {
	chip1.pins(1,2,3).on();
}).delay(200).then(function () {
	chip1.pins(1,2,3).off();
});