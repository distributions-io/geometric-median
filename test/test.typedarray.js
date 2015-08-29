/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	median = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array median', function tests() {

	it( 'should export a function', function test() {
		expect( median ).to.be.a( 'function' );
	});

	it( 'should compute the distribution median', function test() {
		var p, actual, expected;

		p = new Float64Array( [ 0.2, 0.4, 0.6, 0.8  ] );
		actual = new Float64Array( p.length );

		actual = median( actual, p );
		expected = new Float64Array( [ 3, 1, 0, 0 ] );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( median( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
