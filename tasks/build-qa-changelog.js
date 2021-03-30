/* eslint-disable complexity */
const githubApi = require( "../lib/github-api" );
// Const parseVersion = require( "../lib/parse-version" );
// Const _isEmpty = require( "lodash/isEmpty" );
// Const escapeRegExp = require( "../lib/escape-regexp" );
// Const ChangelogBuilder = require( "../lib/logbuilder" );

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
				}
			}


			// Curl -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" -H "Accept: application/vnd.github.v3+json" -s https://api.github.com/repos/${GITHUBACOUNT}/${FOLDER_NAME}/releases/tags/16.1-beta1 | jq .body
			let responseData;
			try {
				const response = await githubApi( "yoast/" + options.pluginSlug + "/releases/tags/" + "16.1-beta1", null, "GET" );
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
			grunt.file.write( options.readmeFile, "hoi" );
			done();
		}
	);
};


