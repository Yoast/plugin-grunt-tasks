// https://github.com/gruntjs/grunt-contrib-watch
module.exports = {
	options: {
		livereload: true,
	},
	grunt: {
		options: {
			reload: true,
		},
		files: [
			"<%= files.grunt %>",
			"<%= files.config %>",
		],
		tasks: [
			"eslint:grunt",
		],
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
