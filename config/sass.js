// https://github.com/sindresorhus/grunt-sass
/* global developmentBuild */
module.exports = {
	build: {
		options: {
			implementation: require('node-sass'),
			sourceMap: developmentBuild
		},
		files: "<%= files.sass %>"
	}
};
