/* eslint-disable complexity */
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
		function() {
			const options = this.options( {
				useEditDistanceCompare: false,
				useANewLineAfterHeader: false,
				typeOfPreRelease: "RC",
			} );
			const done = this.async();
			const newVersion = grunt.option( "plugin-version" );
			// Strip off the RC part from the current plugin version.
			const splitVersion = newVersion.split( "-" + options.typeOfPreRelease );

			// From the resulting array, get the first value (the second value is the RC number).
			const strippedVersion = splitVersion[ 0 ];
			const preReleaseNumber = splitVersion[ 1 ];
			// Const versionNumber = parseVersion( strippedVersion );
			var i;
			for ( i = 0; i < preReleaseNumber; i++ ) {
				if ( i === 0 ) {
					console.log( "load wiki file " );
				} else {
					if ( preReleaseNumber === 1 ) {
						console.log( "use wiki file " );
					} else {
						console.log( "get from git " + strippedVersion + "-" + options.typeOfPreRelease + i );
					}
				}
			}


			grunt.file.write( options.readmeFile, "hoi" );
			done();
		}
	);
};
