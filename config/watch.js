// https://github.com/gruntjs/grunt-contrib-watch
module.exports = {
	options: {
		livereload: true,
	},
	js: {
		files: [
			"<%= files.js %>",
		],
		tasks: [
			"build:js",
		],
	},
	css: {
		files: [
			"<%= files.sass %>",
		],
		tasks: [
			"build:css",
		],
	},
};
