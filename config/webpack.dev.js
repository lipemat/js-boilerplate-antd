let path = require( 'path' );
const webpackConfig = require( '@lipemat/js-boilerplate/config/webpack.dev' );
const packageConfig = require( '@lipemat/js-boilerplate/helpers/package-config' );
let rules = Object.assign( [], webpackConfig.module.rules );
let resolve = Object.assign( {}, webpackConfig.resolve );
let noParse = Object.assign( [], webpackConfig.module.noParse );

// Add a loader to support theming of Ant components.
// @link https://ant.design/docs/react/customize-theme
rules.push( {
	test: /\.less$/,
	use: [
		'style-loader',
		{
			loader: 'css-loader',
			options: {
				modules: false,
				sourceMap: true
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
	resolve: resolve
};
