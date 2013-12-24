'use strict';

var sinon = require('sinon'),
	_ = require('lodash'),
	should = require('should'),
	Pins = require('../lib/mcp-pins');


describe('Pins', function () {
	var sandbox,
		pins;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();

		pins = new Pins({
			mcp: {
				send: sandbox.stub()
			}
		});
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('checks for mcp in config', function () {
		var createInvalidPins = function () {
				pins = new Pins({
					mcp: undefined
				});
			};

		createInvalidPins.should.throw('Must pass mcp value in the config');
	});

	it('creates allPins helper value', function () {
		pins.allPins.length.should.equal(8);
	});

	it('creates flags value for each pin', function () {
		_.each(pins.allPins, function (pin) {
			should.exist(pins.flags[pin]);
		});

		Number(pins.flags[1]).toString(2).should.equal('1');
		Number(pins.flags[2]).toString(2).should.equal('10');
		Number(pins.flags[3]).toString(2).should.equal('100');
		Number(pins.flags[4]).toString(2).should.equal('1000');
		Number(pins.flags[5]).toString(2).should.equal('10000');
		Number(pins.flags[6]).toString(2).should.equal('100000');
		Number(pins.flags[7]).toString(2).should.equal('1000000');
		Number(pins.flags[8]).toString(2).should.equal('10000000');
	});

	it('validates pin numbers', function () {
		var invalidPinSelect = function () {
				pins.select('1', '2');
			};

		invalidPinSelect.should.throw('Pins must be integers: 1');

		invalidPinSelect = function () {
				pins.select(0);
			};

		invalidPinSelect.should.throw('Pin is out of range: 0');

		invalidPinSelect = function () {
				pins.select(pins.numPins + 1);
			};

		invalidPinSelect.should.throw('Pin is out of range: 9');
	});

	it('can set values', function () {
		pins.values.should.not.equal(1);
		pins.setCurrentValues(1);
		pins.values.should.equal(1);
	});

	it('can select all', function () {
		var selected = pins.select();

		selected.pins.length.should.equal(8);
	});

	it('can select some', function () {
		var selected = pins.select(1,2,3);

		selected.pins.should.contain(1)
			.and.contain(2)
			.and.contain(3);
	});

	it('can turn on all pins', function () {
		pins.select().on();

		pins.values.should.equal(255);
	});

	it('can turn on some pins', function () {
		pins.select(4,5,6).on();

		pins.values.should.equal(parseInt('00111000', 2));
	});

	it('can turn off all pins', function () {
		pins.select().on();
		pins.values.should.equal(255);

		pins.select().off();
		pins.values.should.equal(0);
	});

	it('can turn off some pins', function () {
		pins.select().on();
		pins.values.should.equal(255);

		pins.select(3,4,5).off();
		pins.values.should.equal(parseInt('11100011', 2));
	});
});