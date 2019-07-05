// https://github.com/nDmitry/grunt-postcss
module.exports = {
	build: {
		options: {
			map: "<%= developmentBuild %>",
			processors: [
				require( "autoprefixer" )( { browsers: "last 2 versions, IE >= 9" } ),
				require( "cssnano" )(),
			],
		},
		src: "<%= files.css %>",
	},
};
