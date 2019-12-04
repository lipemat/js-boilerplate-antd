const babelConfig = require( '@lipemat/js-boilerplate/config/babel.config' );
let plugins = Object.assign( [], babelConfig.plugins );
if ( 'undefined' === typeof __TEST__ ) {
	plugins.push( [ 'import', {'libraryName': 'antd', 'libraryDirectory': 'es', 'style': true} ] );
} else {
	// Unit tests need a shorter version.
	plugins.push( [ 'import', {'libraryName': 'antd'} ] );

}
module.exports = {
	plugins: plugins
};
