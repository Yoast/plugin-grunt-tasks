/* eslint-disable max-len */
/* eslint-disable complexity */
const { file } = require( "grunt" );
const ChangelogBuilder = require( "../lib/logbuilder" );

/**
 *
 * @param {string} filename filename to write to
 * @param {string} data  data to write
 * @param {object} grunt grunt obejct
 * @returns {null} no return
 */
function writeFileIfNotEmpty( filename, data, grunt ) {
	if ( data !== "" ) {
		if ( file.exists( filename ) ) {
			const original = file.read( filename );
			if ( original !== "" ) {
				const changelogBuilder = new ChangelogBuilder( grunt, original, false, true, "" );
				changelogBuilder.parseChancelogLines( data );
				data = changelogBuilder.qaChangelog;
			}
		}
		file.write( filename, data );
	}
}

/**
 * A task to remove old changelog entries and add new ones in changlog file..
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerMultiTask(
		"extract-extra-pr-texts-from-yoast-cli-md",
		"extract addon and packages PR lines from data retreived with yoast-cli.",
		// eslint-disable-next-line max-statements
		function() {
			const options = this.options( {
				outputFile: "tmp/extracted.md",
				deleteOutputFile: false,
				findThesePackages: [ ],
				findTheseAddons: [ ],
				outputFolder: "tmp/",
			} );
			// Grab te XX.X only from XX.X-RCY/XX.X-betaY
			const fullVersion = grunt.option( "plugin-version" );
			const newVersion = fullVersion.split( "-" )[ 0 ];

			const changelogBuilder = new ChangelogBuilder( grunt, null, options.useEditDistanceCompare, options.useANewLineAfterHeader, options.pluginSlug );
			if ( grunt.file.exists( options.outputFile ) ) {
				if ( options.deleteOutputFile ) {
					grunt.file.delete( options.outputFile );
				} else {
					changelogBuilder.parseChancelogLines( grunt.file.read( options.outputFile ) );
				}
			}

			changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" )   );

			options.findThesePackages.forEach( element => changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), true,  element[ 0 ], false ) );

			options.findTheseAddons.forEach( element => changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), true,  element[ 0 ], false ) );

			// First write left overs
			writeFileIfNotEmpty( options.outputFile, changelogBuilder.qaChangelog, grunt );
			// Write packages files
			options.findThesePackages.forEach( element => {
				if ( element.length === 2 ) {
					changelogBuilder.resetlog();
					changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), false,  element[ 0 ], true  );
					const filename = options.outputFolder + element[ 1 ];
					writeFileIfNotEmpty( filename, changelogBuilder.packageChangelog, grunt );
				}  else {
					grunt.fail.fatal( "findThesePackages options not a array:" + element );
				}
			} );
			// Write Addons files
			options.findTheseAddons.forEach( element => {
				if ( element.length === 2 ) {
					changelogBuilder.resetlog();
					changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), false,  element[ 0 ], true  );
					const filename = options.outputFolder + element[ 1 ];
					writeFileIfNotEmpty( filename, changelogBuilder.qaChangelog, grunt );
				} else {
					grunt.fail.fatal( "findTheseAddons options not a array" + element );
				}
			} );
		}
	);
};
