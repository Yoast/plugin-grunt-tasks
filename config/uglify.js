// https://github.com/gruntjs/grunt-contrib-uglify
/* global global */
module.exports = {
	js: {
		options: {
			preserveComments: 'some',
			report: 'gzip',
			sourceMap: global.developmentBuild,
		},
		files: [{
			expand: true,
			src: '<%= files.js %>',
			ext: '.min.js',
			extDot: 'first',
			isFile: true
		}]
	}
};
