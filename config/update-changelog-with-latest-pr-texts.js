// Custom task
module.exports = {
	options: {
		useEditDistanceComapair: true,
	},
	"wordpress-seo": {
		options: {
			readmeFile: "./readme.txt",
			releaseInChangelog: /[=] \d+\.\d+(\.\d+)? =/g,
		},
	},
	"wordpress-seo-premium": {
		options: {
			readmeFile: "./changelog.md",
			releaseInChangelog: /[#] \d+\.\d+(\.\d+)?\: /g,
		},
	},
	
};
