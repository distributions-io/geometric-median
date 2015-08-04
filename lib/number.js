'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


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
	return ceil( -1 / log2( 1 - p ) );
} // end FUNCTION median()


// EXPORTS

module.exports =  median;
