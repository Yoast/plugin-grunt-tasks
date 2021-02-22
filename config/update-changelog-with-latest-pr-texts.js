// Custom task
module.exports = {
	options: {
		useEditDistanceComapair: true,
	},
	"wordpress-seo": {
		options: {
			readmeFile: "./readme.txt",
			releaseInChangelog: /[=] \d+\.\d+(\.\d+)? =/g,
			matchCorrectHeader: "= " + "VERSIONNUMBER" + "(.|\\n)*?(?=(\\n\\n))",
			matchCorrectLines: "= " + "VERSIONNUMBER" + "(.|\\n)*?(?=(= \\d+[\.\\d]+ =|= Earlier versions =))",
			pluginSlug: "wordpress-seo",
			useANewLineAfterHeader: true,
		},
	},
	"wordpress-seo-premium": {
		options: {
			readmeFile: "./changelog.md",
			releaseInChangelog: /[#] \d+\.\d+(\.\d+)?\: /g,
			matchCorrectLines: "### " + "VERSIONNUMBER" + "(.|\\n)*?(?=(### \\d+[\.\\d]+\: |$))",
			matchCorrectHeader: "### " + "VERSIONNUMBER" + "(.|\\n)*?(?=(\\n\\w\+?:\\n))",
			pluginSlug: "wordpress-seo-premium",
			useANewLineAfterHeader: false,
		},
	},
	
};
