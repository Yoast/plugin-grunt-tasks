// https://github.com/sindresorhus/grunt-sass
/* global global */
module.exports = {
	build: {
		options: {
			implementation: require('node-sass'),
			sourceMap: global.developmentBuild
		},
		files: "<%= files.sass %>"
	}
};
