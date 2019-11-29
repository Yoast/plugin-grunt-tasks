// https://github.com/nDmitry/grunt-postcss
module.exports = {
	build: {
		options: {
			map: "<%= developmentBuild %>",
			processors: [
				require( "autoprefixer" )(),
				require( "cssnano" )(),
			],
		},
		src: "<%= files.css %>",
	},
};
