const githubApi = require( "../lib/github-api" );

/**
 * Gets the release text from the github repo.
 *
 * @param {string} pluginTag The name of the milestone
 * @param {string} pluginSlug The slug name of the repo
 * @param {object} grunt the grunt object
 *
 * @returns {Promise<object|null>} A promise resolving to a single milestone.
 */
async function getGitTagChangeLog( pluginTag, pluginSlug, grunt ) {
	pluginSlug = pluginSlug.toLowerCase();
	let responseData;
	try {
		const response = await githubApi( "yoast/" + pluginSlug + "/releases/tags/" + pluginTag, null, "GET" );
		if ( ! response.ok ) {
			grunt.log.error( response );
		}
		responseData = await response.json();
	} catch ( error ) {
		grunt.log.error( error );
		grunt.fail.fatal( "An error occurred." );
	}
	return typeof responseData.body === "string" ? responseData.body  : "";
}


/**
 * A task to remove old changelog entries and add new ones in changlog file..
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"download-qa-changelog",
		"support function for the build-qa-changelog this will download the needed log entries from github",
		async function() {
			const options = this.options( {
				typeOfPreRelease: "RC",
			} );
			const done = this.async();
			const newVersion = grunt.option( "plugin-version" );

			// Strip off the RC part from the current plugin version.
			const splitVersion = newVersion.split( "-" + options.typeOfPreRelease );

			// From the resulting array, get the first value (the second value is the RC/beta number).
			const strippedVersion = splitVersion[ 0 ];
			const preReleaseNumber = splitVersion[ 1 ];

			// Download the inbetween git release md files
			// So we can use them in de build-qa-changelog function
			var i;
			for ( i = 1; i < preReleaseNumber; i++ ) {
				if ( preReleaseNumber === 1 ) {
					grunt.verbose.writeln( "use wiki file " );
				} else {
					grunt.verbose.writeln( "get from git " + strippedVersion + "-" + options.typeOfPreRelease + i );
					const gitlog = await getGitTagChangeLog( strippedVersion + "-" + options.typeOfPreRelease + i, options.pluginSlug, grunt );
					grunt.verbose.writeln( gitlog );
					grunt.file.write( ".tmp/qachangelog-" + strippedVersion + "-" + options.typeOfPreRelease + i + ".md", gitlog );
				}
			}
			done();
		}
	);
};
