pi-scripts
==========

Raspberry Pi Scripts

### Showing off

Toggle two I2C circuits with a shell script.

    . showoff.sh

### MCP2008 Node Abstraction

A Node.js abstraction around the I2C shell commands to make it easier to program.

    // Note: Work in Progress
    var MCP2008 = require('i2c-parts').MCP2008;
    
    var mcp2008 = new MCP2008({
    		address: 0
    	});
    
    // Turn pins 1,2,3 on
    mcp2008.pins(1,2,3).on();
    
    // Turn pins 2,3 off
    mcp2008.pins(2,3).off();

    // Turn all pins off
    mcp2008.pins().off();