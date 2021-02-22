// Custom task
module.exports = {
	options: {
		useEditDistanceComapair: true,
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
			pluginSlug: "wordpress-seo",
			DefaultOther: "",
			useANewLineAfterHeader: true,
		},
	},
	"wordpress-seo-premium": {
		options: {
			// premium header:
			// ### 15.9: February 23rd, 2021
			readmeFile: "./changelog.md",
			releaseInChangelog: /[#] \d+\.\d+(\.\d+)?\: /g,
			matchChangelogHeader:  /^/ig,
			newHeadertemplate: "### " + "VERSIONNUMBER" + ": " + "DATESTRING"  + "\n",
			matchCorrectLines: "### " + "VERSIONNUMBER" + "(.|\\n)*?(?=(### \\d+[\.\\d]+\: |$))",
			matchCorrectHeader: "### " + "VERSIONNUMBER" + "(.|\\n)*?(?=(\\n\\w\+?:\\n|### \\d+[\.\\d]+\: |$))",
			matchCleanedChangelog: "### " + "VERSIONNUMBER" + "(.|\\n)*$",
			replaceCleanedChangelog: "",
			pluginSlug: "wordpress-seo-premium",
			DefaultOther: "* Includes every change in Yoast SEO core " + "VERSIONNUMBER" + ". See the [core changelog](https://wordpress.org/plugins/wordpress-seo/#developers).",
			useANewLineAfterHeader: false,
		},
	},
	
};
