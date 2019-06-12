// https://github.com/sindresorhus/grunt-sass
/* global developmentBuild */
module.exports = {
	build: {
		options: {
			sourceMap: developmentBuild
		},
		files: "<%= files.sass %>"
	}
};
