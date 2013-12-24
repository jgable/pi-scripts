'use strict';

var MCP2008 = require('../lib/mcp2008'),
	should = require('should'),
	_ = require('lodash');

describe('MCP2008', function () {
	it('has pins', function () {
		var chip = new MCP2008({
			address: 32
		});

		_.isFunction(chip.pins).should.equal(true);

		var selected = chip.pins(1,2,3);

		should.exist(selected);
	});
});