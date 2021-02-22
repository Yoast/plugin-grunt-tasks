// Custom task
module.exports = {
	options: {
		useEditDistanceComapair: true,
	},
	"wordpress-seo": {
		options: {
			readmeFile: "./readme.txt",
			releaseInChangelog: /[=] \d+\.\d+(\.\d+)? =/g,
			matchChangelogHeader:  /[=]= Changelog ==/ig,
			newHeadertemplate: "== Changelog ==\n\n" +"= " + "VERSIONNUMBER" + " =\nRelease Date: " + "DATESTRING"  + "\n",
			matchCorrectHeader: "= " + "VERSIONNUMBER" + "(.|\\n)*?(?=(\\n\\n))",
			matchCorrectLines: "= " + "VERSIONNUMBER" + "(.|\\n)*?(?=(= \\d+[\.\\d]+ =|= Earlier versions =))",
			matchCleanedChangelog: "= " + "VERSIONNUMBER" + "(.|\\n)*= Earlier versions =",
			replaceCleanedChangelog: "= Earlier versions =",
			pluginSlug: "wordpress-seo",
			useANewLineAfterHeader: true,
		},
	},
	"wordpress-seo-premium": {
		options: {
			readmeFile: "./changelog.md",
			releaseInChangelog: /[#] \d+\.\d+(\.\d+)?\: /g,
			matchChangelogHeader:  /^/ig,
			newHeadertemplate: "### " + "VERSIONNUMBER" + ": " + "DATESTRING"  + "\n",
			matchCorrectLines: "### " + "VERSIONNUMBER" + "(.|\\n)*?(?=(### \\d+[\.\\d]+\: |$))",
			matchCorrectHeader: "### " + "VERSIONNUMBER" + "(.|\\n)*?(?=(\\n\\w\+?:\\n))",
			matchCleanedChangelog: "### " + "VERSIONNUMBER" + "(.|\\n)*$",
			replaceCleanedChangelog: "",
			pluginSlug: "wordpress-seo-premium",
			useANewLineAfterHeader: false,
		},
	},
	
};
