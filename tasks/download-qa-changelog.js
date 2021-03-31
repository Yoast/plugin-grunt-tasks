/* eslint-disable complexity */
const githubApi = require( "../lib/github-api" );
// Const parseVersion = require( "../lib/parse-version" );
// Const _isEmpty = require( "lodash/isEmpty" );
// Const escapeRegExp = require( "../lib/escape-regexp" );
// Const ChangelogBuilder = require( "../lib/logbuilder" );


/**
 * Gets a milestone from the  repo.
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
	// / bl message: 'Not Found',
	// Console.log( responseData );
	const body = typeof responseData.body === "string" ? responseData.body  : "";
	return body;
}


/**
 * A task to remove old changelog entries and add new ones in changlog file..
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"download-qa-changelogs",
		"download qa logs for a specific number form the github release",
		async function() {
			const options = this.options( {
				typeOfPreRelease: "RC",
				readmeFile: "/tmp/readme.txt",
			} );
			const done = this.async();
			grunt.file.write( options.readmeFile, "hoi" );
			const newVersion = grunt.option( "plugin-version" );
			// Strip off the RC part from the current plugin version.
			const splitVersion = newVersion.split( "-" + options.typeOfPreRelease );

			// From the resulting array, get the first value (the second value is the RC/beta number).
			const strippedVersion = splitVersion[ 0 ];
			const preReleaseNumber = splitVersion[ 1 ];
			// Const versionNumber = parseVersion( strippedVersion );

			// Load the file from the wiki (yoast-cli)
			grunt.verbose.writeln( "load wiki file " );
			// Remove the already mentioned entries
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

