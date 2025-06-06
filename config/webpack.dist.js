let path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( "css-minimizer-webpack-plugin" );
const webpackConfig = require( '@lipemat/js-boilerplate/config/webpack.dist' );
const packageConfig = require( '@lipemat/js-boilerplate/helpers/package-config' );
let rules = Object.assign( [], webpackConfig.module.rules );
let noParse = Object.assign( [], webpackConfig.module.noParse );
let plugins = Object.assign( [], webpackConfig.plugins );
let optimization = Object.assign( {}, webpackConfig.optimization || {} );

// Override the miniCSSExtractPlugin to disable warnings about conflicting order
for ( let i = 0; i < plugins.length; i++ ) {
	if ( plugins[ i ].options && 'undefined' !== typeof plugins[ i ].options.ignoreOrder ) {
		plugins[ i ].options.ignoreOrder = true;
	}
}

// Use CSS minimizer optimization.
// @link https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
optimization.minimizer = optimization.minimizer || [];
optimization.minimizer.push( `...`);
optimization.minimizer.push( new CssMinimizerPlugin() );

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
				sourceMap: false
			}
		},
		{
			loader: 'less-loader',
			options: {
				lessOptions: {
					javascriptEnabled: true,
					modifyVars: require( path.resolve( packageConfig.workingDirectory, './src/globals/ant-theme.js' ) )
				}
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
	optimization: optimization,
	plugins: plugins
};
