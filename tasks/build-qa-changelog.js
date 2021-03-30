/* eslint-disable complexity */
const parseVersion = require( "../lib/parse-version" );
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
				defaultChangelogEntrys: "",
			} );
			const done = this.async();
			const newVersion = grunt.option( "plugin-version" );
			const versionNumber = parseVersion( newVersion );

			console.log( options.useANewLineAfterHeader );
			console.log( versionNumber.patch );
			grunt.file.write( options.readmeFile, "hoi" );
			done();
		}
	);
};
