// Custom task
module.exports = {
	options: {
		useEditDistanceComapair: true,
	},
	"wordpress-seo": {
		options: {
			readmeFile: "./readme.txt",
			releaseInChangelog: /[=] \d+\.\d+(\.\d+)? =/g,
			pluginSlug: "wordpress-seo",
			useANewLineAfterHeader: true,
		},
	},
	"wordpress-seo-premium": {
		options: {
			readmeFile: "./changelog.md",
			releaseInChangelog: /[#] \d+\.\d+(\.\d+)?\: /g,
			pluginSlug: "wordpress-seo-premium",
			useANewLineAfterHeader: false,
		},
	},
	
};
