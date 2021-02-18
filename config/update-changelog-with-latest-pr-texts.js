// Custom task
module.exports = {
	options: {
		useEditDistanceComapair: true,
	},
	"wordpress-seo": {
		options: {
			readmePath: "readme.txt",
		},
	},
	"wordpress-seo-premium": {
		options: {
			readmePath: "changelog.MD",
		},
	},
	default: {
		options: {
			readmePath: "readme.txt",
		},
	},
};
