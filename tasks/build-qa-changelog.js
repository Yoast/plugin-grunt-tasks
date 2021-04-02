/* eslint-disable complexity */
// Const parseVersion = require( "../lib/parse-version" );
// Const _isEmpty = require( "lodash/isEmpty" );
// Const escapeRegExp = require( "../lib/escape-regexp" );
const ChangelogBuilder = require( "../lib/logbuilder" );


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
		function() {
			const options = this.options( {
				useEditDistanceCompare: false,
				useANewLineAfterHeader: false,
				typeOfPreRelease: "RC",
				readmeFile: "/tmp/readme.txt",
			} );
			const done = this.async();
			// Grunt.file.write( options.readmeFile, "hoi" );
			const newVersion = grunt.option( "plugin-version" );
			// Strip off the RC part from the current plugin version.
			const splitVersion = newVersion.split( "-" + options.typeOfPreRelease );

			// From the resulting array, get the first value (the second value is the RC/beta number).
			const strippedVersion = splitVersion[ 0 ];
			const preReleaseNumber = splitVersion[ 1 ];
			// Const versionNumber = parseVersion( strippedVersion );
			console.log( "TEEEST" + preReleaseNumber );
			// eslint-disable-next-line max-len
			const changelogBuilder = new ChangelogBuilder( grunt, null, options.useEditDistanceCompare, options.useANewLineAfterHeader, options.pluginSlug );
			const wikimd = grunt.file.read( "./.tmp/wordpress-seo-premium-16.1.md" );
			changelogBuilder.parseYoastCliGeneratedChangelog( wikimd );

			// Load the file from the wiki (yoast-cli)
			grunt.verbose.writeln( "load wiki file " );
			// Remove the already mentioned entries
			var i;
			for ( i = 1; i < preReleaseNumber; i++ ) {
				console.log( i );
				if ( preReleaseNumber === 1 ) {
					grunt.verbose.writeln( "use wiki file " );
					console.log( "use wiki file " );
				} else {
					grunt.verbose.writeln( "get from git " + strippedVersion + "-" + options.typeOfPreRelease + i );
					const changelog = grunt.file.read( ".tmp/qachangelog-" + strippedVersion + "-" + options.typeOfPreRelease + i + ".md" );
					changelogBuilder.parseChancelogLines( changelog );

					// Console.log( changelog );
				}
			}

			console.log( ">" + changelogBuilder.qaChangelog + "<" );
			grunt.file.write( options.readmeFile, "hoi" );
			done();
		}
	);
};
