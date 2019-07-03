// https://github.com/gruntjs/grunt-contrib-uglify
module.exports = {
	js: {
		options: {
			preserveComments: "some",
			report: "gzip",
			sourceMap: "<%= developmentBuild %>",
		},
		files: [ {
			expand: true,
			src: "<%= files.js %>",
			ext: ".min.js",
			extDot: "first",
			isFile: true,
		} ],
	},
};
