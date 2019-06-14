// https://github.com/nDmitry/grunt-postcss
/* global global */
module.exports = {
	build: {
		options: {
			map: global.developmentBuild,
			processors: [
				require( "autoprefixer" )( { browsers: "last 2 versions, IE >= 9" } ),
				require( "cssnano" )(),
			],
		},
		src: "<%= files.css %>",
	},
};
