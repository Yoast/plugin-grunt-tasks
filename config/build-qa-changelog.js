/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-concat */
// Custom task
module.exports = {
	"wordpress-seo-premium": {
		options: {
			// Premium header:
			// ### 15.9: February 23rd, 2021
			readmeFile: "./changelog.md",
			releaseInChangelog: /[#] \d+\.\d+(\.\d+)?\: /g,
			matchChangelogHeader: /^/ig,
			newHeadertemplate: "### " + "VERSIONNUMBER" + ": " + "DATESTRING"  + "\n",
			matchCorrectLines: "### " + "VERSIONNUMBER" + "(.|\\n)*?(?=(### \\d+[\.\\d]+\: |$))",
			matchCorrectHeader: "### " + "VERSIONNUMBER" + "(.|\\n)*?\\n(?=(\\w\+?:\\n|### \\d+[\.\\d]+\: |$))",
			matchCleanedChangelog: "### " + "VERSIONNUMBER" + "(.|\\n)*$",
			replaceCleanedChangelog: "",
			defaultChangelogEntrys: "Other:\n* Includes every change in Yoast SEO core " + "VERSIONNUMBER" + ". See the [core changelog](https://wordpress.org/plugins/wordpress-seo/#developers).\n",
			useANewLineAfterHeader: false,
		},
	},
};
