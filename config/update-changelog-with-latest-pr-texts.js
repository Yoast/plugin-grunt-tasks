// Custom task
module.exports = {
	options: {
		useEditDistanceComapair: true,
		pluginSlug: "<%= pluginSlug %>",
		commitChangelog: true,
	},
	"wordpress-seo": {
		options: {
			// free header:
			// = 15.7 =
			// Release Date: January 26th, 2021
			readmeFile: "./readme.txt",
			releaseInChangelog: /[=] \d+\.\d+(\.\d+)? =/g,
			matchChangelogHeader:  /[=]= Changelog ==\n\n/ig,
			newHeadertemplate: "== Changelog ==\n\n" +"= " + "VERSIONNUMBER" + " =\nRelease Date: " + "DATESTRING"  + "\n\n",
			matchCorrectHeader: "= " + "VERSIONNUMBER" + "(.|\\n)*?\\n(?=(\\w\+?:\\n|= \\d+[\.\\d]+ =|= Earlier versions =))",
			matchCorrectLines: "= " + "VERSIONNUMBER" + "(.|\\n)*?(?=(= \\d+[\.\\d]+ =|= Earlier versions =))",
			matchCleanedChangelog: "= " + "VERSIONNUMBER" + "(.|\\n)*= Earlier versions =",
			replaceCleanedChangelog: "= Earlier versions =",
			defaultChangelogEntrys: "",
			useANewLineAfterHeader: true,
		},
	},
};
