'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// FUNCTIONS //

var ceil = Math.ceil,
	log2;

/**
* FUNCTION log2( x )
*	Returns the logarithm of `x` with base 2.
*
* @param {Number} x - input value
* @returns {Number} logarithm of x with respect to base 2
*/
function log2( x ) {
	return Math.log( x ) / Math.log( 2 );
} // end FUNCTION log2()


// MEDIAN //

/**
* FUNCTION median( p )
*	Computes the distribution median for a geometric distribution with parameter p.
*
* @param {Number} p - success probability
* @returns {Number} distribution median
*/
function median( p ) {
	if ( !( isNumber(p) && 0 <= p && p <= 1) ) {
		return NaN;
	}
	return ceil( -1 / log2( 1 - p ) ) - 1;
} // end FUNCTION median()


// EXPORTS

module.exports =  median;
