// See https://github.com/gruntjs/grunt-contrib-copy
module.exports = {
	"css-files": {
		files: [
			{
				expand: true,
				cwd: "css/src",
				// TO DO: remove the exclude when ready
				src: [ "**/**.css" ],
				flatten: false,
				dest: "css/dist/",
			},
		],
	},
};
