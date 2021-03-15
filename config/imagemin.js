// See https://github.com/gruntjs/grunt-contrib-imagemin for details.

// Copied from grunt-contrib-imagemin/tasks/imagemin.js
const defaultPlugins = [
	"gifsicle",
	"jpegtran",
	"optipng",
	"svgo",
];

const svgoOptions = {
	plugins: [
		{ removeTitle: true },
		{ removeDesc: true },
		{ removeUnknownsAndDefaults: {
			keepRoleAttr: true,
			keepAriaAttrs: true,
		} },
		{ addAttributesToSVGElement: {
			attributes: [
				{ role: "img" },
				{ "aria-hidden": "true" },
				{ focusable: "false" },
			],
		} },
	],
};

/**
 * Creates an array of imagemin plugins.
 *
 * @returns {Array} Array of imagemin plugins.
 */
function getPlugins() {
	return defaultPlugins.map( ( pluginName ) => {
		const options = pluginName === "svgo" ? svgoOptions : {};
		/* eslint-disable-next-line global-require */
		return require( `imagemin-${ pluginName }` )( options );
	}, [] );
}

module.exports = {
	plugin: {
		options: {
			use: getPlugins(),
		},
		files: [
			{
				expand: true,
				cwd: "<%= paths.images %>",
				src: [ "*.*" ],
				dest: "<%= paths.images %>",
				isFile: true,
			},
			{
				expand: true,
				cwd: "<%= paths.assets %>",
				src: [ "*.*" ],
				dest: "<%= paths.assets %>",
				isFile: true,
			},
		],
	},
};
