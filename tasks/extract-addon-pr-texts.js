/* eslint-disable complexity */
// Const parseVersion = require( "../lib/parse-version" );
// Const _isEmpty = require( "lodash/isEmpty" );
const escapeRegExp = require( "../lib/escape-regexp" );
const ChangelogBuilder = require( "../lib/logbuilder" );

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
		// eslint-disable-next-line complexity
		// eslint-disable-next-line max-statements
		function() {
			const options = this.options( {
				all: true,
				findThesePackages: [ ],
			} );
			const done = this.async();
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

			grunt.file.write( options.outputFile, changelogBuilder.qaChangelog );

			options.findThesePackages.forEach( element => {
				changelogBuilder.resetlog();
				// eslint-disable-next-line max-len
				changelogBuilder.parseYoastCliGeneratedChangelogPackageItemsOnly(  grunt.file.read( "./.tmp/" + options.pluginSlug + "-" + newVersion + ".md" ), false, escapeRegExp( element )  );
				grunt.file.write( "tmp/" + element.replace( "/", "-" ) + ".md", changelogBuilder.qaChangelog );
			} );

			done();
		}
	);
};
