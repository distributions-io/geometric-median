Median
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Geometric](https://en.wikipedia.org/wiki/geometric_distribution) distribution [median](https://en.wikipedia.org/wiki/Median).

The [median](https://en.wikipedia.org/wiki/Median) for a [geometric](https://en.wikipedia.org/wiki/geometric_distribution) random variable is

<div class="equation" align="center" data-raw-text="\operatorname{median}\left( X \right) = \left\lceil \frac{-1}{\log_2(1-p)} \right\rceil - 1" data-equation="eq:median">
	<img src="https://cdn.rawgit.com/distributions-io/geometric-median/f1732c7836760bd79bb936e5bac35a36473c7d5d/docs/img/eqn.svg" alt="Median for a geometric distribution.">
	<br>
</div>

where `0 <= p <= 1` is the success probability. The random variable `X` denotes the number of failures until the first success in a sequence of independent Bernoulli trials.


## Installation

``` bash
$ npm install distributions-geometric-median
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var median = require( 'distributions-geometric-median' );
```

#### median( p[, opts] )

Computes the [median](https://en.wikipedia.org/wiki/Median) for a [geometric](https://en.wikipedia.org/wiki/geometric_distribution) distribution with parameter `p` . `p` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	p,
	mat,
	out,
	i;


out = median( 0.2 );
// returns 3

p = [ 0.2, 0.4, 0.6, 0.8 ];
out = median( p );
// returns [ 3, 1, 0, 0 ]

p = new Float32Array( p );
out = median( p );
// returns Float64Array( [3,1,0,0] )

p =  matrix( [ 0.2, 0.4, 0.6, 0.8 ], [2,2] );
/*
	[ 0.2 0.4
	  0.6 0.8 ]
*/

out = median( p );
/*
	[ 3 1
	  0 0 ]
*/

```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var p = [
	[0,0.2],
	[1,0.4],
	[2,0.6],
	[3,0.8]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = median( p, {
	'accessor': getValue
});
// returns [ 3, 1, 0, 0 ]

```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var p = [
	{'x':[9,0.2]},
	{'x':[9,0.4]},
	{'x':[9,0.6]},
	{'x':[9,0.8]}
];

var out = median( p, {
	'path': 'x|1',
	'sep': '|'
});
/*
	[ { x: [ 9, 3 ] },
	  { x: [ 9, 1 ] },
	  { x: [ 9, 0 ] },
	  { x: [ 9, 0 ] } ]
*/

var bool = ( p === out );
// returns true

```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var p, out;

p = new Float64Array( [ 0.2,0.4,0.6,0.8 ] );

out = median( p, {
	'dtype': 'int32'
});
// returns Int32Array( [3,1,0,0] )

// Works for plain arrays, as well...
out = median( [0.2,0.4,0.6,0.8], {
	'dtype': 'int32'
});
// returns Int32Array( [3,1,0,0] )

```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var p,
	bool,
	mat,
	out,
	i;

p = [ 0.2, 0.4, 0.6, 0.8 ];

out = median( p, {
	'copy': false
});
// returns [ 3, 1, 0, 0 ]

bool = ( p === out );
// returns true

mat = matrix( [ 0.2, 0.4, 0.6, 0.8 ], [2,2] );
/*
	[ 0.2 0.4
	  0.6 0.8 ]
*/

out = median( mat, {
	'copy': false
});
/*
	[ 3 1
	  0 0 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a number on the interval [0,1], the [median](https://en.wikipedia.org/wiki/Median) is `NaN`.

	``` javascript
	var p, out;

	out = median( -1 );
	// returns NaN

	out = median( 1.1 );
	// returns NaN

	out = median( null );
	// returns NaN

	out = median( true );
	// returns NaN

	out = median( {'a':'b'} );
	// returns NaN

	out = median( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	p = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = median( p, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = median( p, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = median( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	median = require( 'distributions-geometric-median' );

var p,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
p = new Array( 10 );
for ( i = 0; i < p.length; i++ ) {
	p[ i ] = i / 10;
}
out = median( p );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < p.length; i++ ) {
	p[ i ] = {
		'x': p[ i ]
	};
}
out = median( p, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < p.length; i++ ) {
	p[ i ] = {
		'x': [ i, p[ i ].x ]
	};
}
out = median( p, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
p = new Float64Array( 10 );
for ( i = 0; i < p.length; i++ ) {
	p[ i ] = i / 10;
}
out = median( p );

// Matrices...
mat = matrix( p, [5,2], 'float64' );
out = median( mat );

// Matrices (custom output data type)...
out = median( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-geometric-median.svg
[npm-url]: https://npmjs.org/package/distributions-geometric-median

[travis-image]: http://img.shields.io/travis/distributions-io/geometric-median/master.svg
[travis-url]: https://travis-ci.org/distributions-io/geometric-median

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/geometric-median/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/geometric-median?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/geometric-median.svg
[dependencies-url]: https://david-dm.org/distributions-io/geometric-median

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/geometric-median.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/geometric-median

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/geometric-median.svg
[github-issues-url]: https://github.com/distributions-io/geometric-median/issues
