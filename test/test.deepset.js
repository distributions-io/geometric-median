/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	median = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset median', function tests() {

	it( 'should export a function', function test() {
		expect( median ).to.be.a( 'function' );
	});

	it( 'should compute the distribution median and deep set', function test() {
		var data, expected;

		data = [
			{'x':0.2},
			{'x':0.4},
			{'x':0.6},
			{'x':0.8}
		];

		data = median( data, 'x' );
		expected = [
			{'x':4},
			{'x':2},
			{'x':1},
			{'x':1}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,0.2]},
			{'x':[9,0.4]},
			{'x':[9,0.6]},
			{'x':[9,0.8]}
		];

		data = median( data, 'x/1', '/' );
		expected = [
			{'x':[9,4]},
			{'x':[9,2]},
			{'x':[9,1]},
			{'x':[9,1]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( median( [], 'x' ), [] );
		assert.deepEqual( median( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = median( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
