// https://github.com/nDmitry/grunt-postcss
const autoprefixer = require( "autoprefixer" );
const cssnano = require( "cssnano" );

module.exports = {
	build: {
		options: {
			map: "<%= developmentBuild %>",
			processors: [
				autoprefixer(),
				cssnano(),
			],
		},
		src: "<%= files.css %>",
	},
};
