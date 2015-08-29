/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	median = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number median', function tests() {

	it( 'should export a function', function test() {
		expect( median ).to.be.a( 'function' );
	});

	it( 'should compute the distribution median', function test() {
		assert.strictEqual( median( 0.2 ), 3 );
		assert.strictEqual( median( 0.4  ), 1 );
		assert.strictEqual( median( 0.6  ), 0 );
		assert.strictEqual( median( 0.8  ), 0 );
	});

	it( 'should return `NaN` for invalid values of parameter p', function test() {
		assert.isTrue( isnan( median( -1 ) ) );
		assert.isTrue( isnan( median( 1.1 ) ) );
	});

});
