/**
 * Change these variables to adjust the Ant components.
 *
 * @link https://ant.design/docs/react/customize-theme
 * @link https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
 *
 * @link wp-content/themes/core/js/node_modules/@ant-design/dark-theme/index.js
 *
 * 'type {{}}
 */
module.exports = {
	...require( '@ant-design/dark-theme' ).default,
	...{
		'badge-height': '15px',
		'badge-text-color': '#171717',
		'menu-dark-item-active-bg': '@item-hover-bg',
		'menu-dark-item-hover-bg': '@item-hover-bg',
		'menu-inline-toplevel-item-height': '80px'
	}
};
