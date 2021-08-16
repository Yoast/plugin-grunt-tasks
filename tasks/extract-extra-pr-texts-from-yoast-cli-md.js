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
function writeFileIfNotEmpty( filename, data ) {
	if ( data !== "" ) {
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
				all: true,
				findThesePackages: [ ],
				findTheseAddons: [ ],
				outputFolder: "tmp/",
			} );
			// Grab te XX.X only from XX.X-RCY/XX.X-betaY
			const fullVersion = grunt.option( "plugin-version" );
			const newVersion = fullVersion.split( "-" )[ 0 ];
			if ( fullVersion.match( "beta" ) ) {
				options.daysToAddForNextRelease = options.daysToAddForNextRelease + 7;
			}


			const changelogBuilder = new ChangelogBuilder( grunt, null, options.useEditDistanceCompare, options.useANewLineAfterHeader, options.pluginSlug );
			if ( grunt.file.exists( options.outputFile ) ) {
				changelogBuilder.parseChancelogLines( grunt.file.read( options.outputFile ) );
			}


			changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" )   );


			options.findThesePackages.forEach( element => changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), true,  element, false ) );

			options.findTheseAddons.forEach( element => changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), true,  element, false ) );

			// First write left overs
			writeFileIfNotEmpty( options.outputFile, changelogBuilder.qaChangelog );
			// Write packages files
			options.findThesePackages.forEach( element => {
				changelogBuilder.resetlog();

				changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), false,  element, true  );
				const filename = options.outputFolder + element.replace( "/", "--" ).replace( "[", "" ).replace( "]", "" ).replace( "@", "" ) + ".md";
				writeFileIfNotEmpty( filename, changelogBuilder.packageChangelog );
			} );
			// Write Addons files
			options.findTheseAddons.forEach( element => {
				changelogBuilder.resetlog();

				changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), false,  element, true  );
				const filename = options.outputFolder + element.replace( "/", "--" ).replace( "[", "" ).replace( "]", "" ).replace( "@", "" ) + ".md";
				writeFileIfNotEmpty( filename, changelogBuilder.qaChangelog );
			} );
		}
	);
};
