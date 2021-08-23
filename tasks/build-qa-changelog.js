/* eslint-disable complexity */
const parseVersion = require( "../lib/parse-version" );
const ChangelogBuilder = require( "../lib/logbuilder" );

/**
 * A calulate previus Version
 * @param {string} strippedVersion string
 * @returns {string} previsu version string
 */
function previusVersion( strippedVersion ) {
	const versionNumber = parseVersion( strippedVersion );
	var patch = 0;
	var major = 0;
	var minor = 0;
	if ( versionNumber.patch ) {
		patch =  versionNumber.patch - 1;
		major = versionNumber.major;
		minor = versionNumber.minor;
	} else {
		if ( versionNumber.minor === 0 ) {
			minor = 9;
			major = versionNumber.major - 1;
		} else {
			major = versionNumber.major;
			minor = versionNumber.minor - 1;
		}
	}
	/* Ba
		versionNumber.major
		versionNumber.minor
		versionNumber.patch
	*/
	var version = major + "." + minor;
	if ( patch > 0 ) {
		version = version + "." + patch;
	}

	return version;
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
		"Build a file needed for the QA changelog calculates this from github release entry's and yoast-cli generated git",
		function() {
			const options = this.options( {
				useEditDistanceCompare: false,
				useANewLineAfterHeader: false,
				outputFile: ".tmp/QA-Changelog.md",
				addTheseExtraFiles: [ "" ],
			} );
			const done = this.async();
			// Grunt.file.write( options.readmeFile, "hoi" );
			const newVersion = grunt.option( "plugin-version" );
			const typeOfPreRelease = ( newVersion.match( "beta" ) ) ? "beta" : "RC";

			// Strip off the RC part from the current plugin version.
			const splitVersion = newVersion.split( "-" + typeOfPreRelease );

			// From the resulting array, get the first value (the second value is the RC/beta number).
			const strippedVersion = splitVersion[ 0 ];
			const preReleaseNumber = splitVersion[ 1 ];

			// eslint-disable-next-line max-len
			const changelogBuilder = new ChangelogBuilder( grunt, null, options.useEditDistanceCompare, options.useANewLineAfterHeader, options.pluginSlug );
			const wikimd = grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + strippedVersion + ".md" );
			changelogBuilder.parseYoastCliGeneratedChangelog( wikimd, false, false, true );
			options.addTheseExtraFiles.forEach( filename => {
				if  ( filename !== "" ) {
					if ( grunt.file.exists( filename ) ) {
						changelogBuilder.parseYoastCliGeneratedChangelog(  grunt.file.read( filename ), false, false, true );
					}
				}
			} );

			// Load the file from the wiki (yoast-cli)
			grunt.verbose.writeln( "load wiki file " );
			// Remove the already mentioned entries
			var i;
			var header = "Changes compared to " + previusVersion( strippedVersion ) + "\n\n";
			for ( i = 1; i < preReleaseNumber; i++ ) {
				if ( preReleaseNumber === 1 ) {
					// Set header tpo previos main
					header = "Changes compared to " + previusVersion( strippedVersion ) + "\n\n";
					grunt.verbose.writeln( "use wiki file " );
				} else {
					grunt.verbose.writeln( "get from git " + strippedVersion + "-" + typeOfPreRelease + i );
					const changelog = grunt.file.read( ".tmp/qachangelog-" + strippedVersion + "-" + typeOfPreRelease + i + ".md" );
					changelogBuilder.parseChancelogLines( changelog, true );
					header = "Changes compared to " + strippedVersion + "-" + typeOfPreRelease + i + "\n\n";
				}
			}
			grunt.file.write( options.outputFile, header + changelogBuilder.qaChangelog );
			done();
		}
	);
};
