// https://github.com/sindresorhus/grunt-sass
module.exports = {
	build: {
		options: {
			implementation: require( "node-sass" ),
			sourceMap: "<%= developmentBuild %>",
		},
		files: "<%= sassFiles %>",
	},
};
