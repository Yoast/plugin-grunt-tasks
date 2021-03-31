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
 * @param {object} grunt
 *
 * @returns {Promise<object|null>} A promise resolving to a single milestone.
 */
async function getGitTagChangeLog( pluginTag, pluginSlug, grunt ) {
	pluginSlug = pluginSlug.toLowerCase();
	let responseData;
	try {
		const response = await githubApi( "yoast/" + pluginSlug + "/releases/tags/" + pluginTag, null, "GET" );
		if ( ! response.ok ) {
			// Await logError( response, grunt );
			grunt.log.error( response );
		}
		responseData = await response.json();
	} catch ( error ) {
		grunt.log.error( error );
		grunt.fail.fatal( "An error occurred." );
	}

	console.log( responseData );

	return responseData.body;
}


/**
 * A task to remove old changelog entries and add new ones in changlog file..
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"build-qa-changelog",
		"updates the changelog entry in a file specified.",
		// eslint-disable-next-line complexity
		// eslint-disable-next-line max-statements
		async function() {
			const options = this.options( {
				useEditDistanceCompare: false,
				useANewLineAfterHeader: false,
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
			console.log( "load wiki file " );
			// Remove the already mentioned entries
			var i;
			for ( i = 1; i < preReleaseNumber; i++ ) {
				if ( preReleaseNumber === 1 ) {
					console.log( "use wiki file " );
				} else {
					console.log( "get from git " + strippedVersion + "-" + options.typeOfPreRelease + i );
					const gitlog = await getGitTagChangeLog( strippedVersion + "-" + options.typeOfPreRelease + i, options.pluginSlug, grunt );
					console.log( gitlog );
				}
			}

			// Const gitlog = await getGitTagChangeLog( "16.1-beta1", options.pluginSlug, grunt );
			// Console.log( gitlog );


			// Console.log( responseData );
			grunt.file.write( options.readmeFile, "hoi" );
			done();
		}
	);
};


