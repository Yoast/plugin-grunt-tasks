// See: https://github.com/gruntjs/grunt-contrib-compress for details.
module.exports = {
	artifact: {
		options: {
			archive: "<%= pluginSlug %>-<%= pluginVersion %>.zip",
			level: 9,
		},
		files: [
			{
				cwd: "artifact/",
				src: [ "**" ],
				dest: "<%= pluginSlug %>",
			},
		],
	},
};
