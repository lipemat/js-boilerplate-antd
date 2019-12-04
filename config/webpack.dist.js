let path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const webpackConfig = require( '@lipemat/js-boilerplate/config/webpack.dist' );
const packageConfig = require( '@lipemat/js-boilerplate/helpers/package-config' );
let rules = Object.assign( [], webpackConfig.module.rules );
let resolve = Object.assign( {}, webpackConfig.resolve );
let noParse = Object.assign( [], webpackConfig.module.noParse );
let plugins = Object.assign( [], webpackConfig.plugins );

// Override the miniCSSExtractPlugin to disable warnings about conflicting order
for ( let i = 0; i < plugins.length; i++ ) {
	if ( plugins[ i ].options && 'undefined' !== typeof plugins[ i ].options.ignoreOrder ) {
		plugins[ i ].options.ignoreOrder = true;
	}
}

resolve.alias = Object.assign( {}, resolve.alias );
/**
 * Prevent Ant for adding all 500K of icons to the bundle
 * @link https://github.com/ant-design/ant-design/issues/12011#issuecomment-481656550
 */
resolve.alias[ '@ant-design/icons/lib/dist$' ] = path.resolve( packageConfig.workingDirectory, './src/globals/ant-icons.js' );

// Add a loader to support theming of Ant components.
// @link https://ant.design/docs/react/customize-theme
rules.push( {
	test: /\.less$/,
	use: [
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				modules: false,
				sourceMap: false,
				ignoreOrder: true
			}
		},
		{
			loader: 'less-loader',
			options: {
				javascriptEnabled: true,
				modifyVars: require( path.resolve( packageConfig.workingDirectory, './src/globals/ant-theme.js' ) ),
				ignoreOrder: true
			}
		}
	]
} );

// Prevent moment from loading all it's localizations
noParse.push( /moment.js/ );

module.exports = {
	module: {
		noParse: noParse,
		rules: rules
	},
	plugins: plugins,
	resolve: resolve
};

