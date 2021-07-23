/* eslint-disable complexity */
// Const parseVersion = require( "../lib/parse-version" );
// Const _isEmpty = require( "lodash/isEmpty" );
const escapeRegExp = require( "../lib/escape-regexp" );
const ChangelogBuilder = require( "../lib/logbuilder" );
/**
 *
 * @param {string} filename filename to write to
 * @param {string} data  data to write
 * @param {object} grunt grunt obejct
 * @returns {null} no return
 */
function writefileifnotempty( filename, data, grunt ) {
	if ( data !== "" ) {
		grunt.file.write( filename, data );
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
		"extract-addon-pr-texts",
		"extract addon PR lines from data retreived with yoast-cli.",
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

			// eslint-disable-next-line max-len
			const changelogBuilder = new ChangelogBuilder( grunt, null, options.useEditDistanceCompare, options.useANewLineAfterHeader, options.pluginSlug );

			// eslint-disable-next-line max-len
			changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" )   );

			// eslint-disable-next-line max-len
			options.findThesePackages.forEach( element => changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), true, escapeRegExp( element )  ) );
			// eslint-disable-next-line max-len
			options.findTheseAddons.forEach( element => changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), true, escapeRegExp( element )  ) );


			writefileifnotempty( options.outputFile, changelogBuilder.qaChangelog, grunt );
			options.findThesePackages.forEach( element => {
				changelogBuilder.resetlog();
				// eslint-disable-next-line max-len
				changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), false, escapeRegExp( element ), true  );
				const filename = options.outputFolder + element.replace( "/", "--" ).replace( "[", "" ).replace( "]", "" ).replace( "@", "" ) + ".md";
				writefileifnotempty( filename, changelogBuilder.packageChangelog, grunt );
			} );
			options.findTheseAddons.forEach( element => {
				changelogBuilder.resetlog();
				// eslint-disable-next-line max-len
				changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), false, escapeRegExp( element ), true  );
				const filename = options.outputFolder + element.replace( "/", "--" ).replace( "[", "" ).replace( "]", "" ).replace( "@", "" ) + ".md";
				writefileifnotempty( filename, changelogBuilder.qaChangelog, grunt );
			} );
		}
	);
};
