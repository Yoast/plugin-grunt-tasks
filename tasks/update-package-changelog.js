// /* eslint-disable complexity */
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
		"update-package-changelog",
		"updates the changelog file with data retreived from yoast-cli.",
		// eslint-disable-next-line complexity
		// eslint-disable-next-line max-statements
		function() {
			const options = this.options( {
				useEditDistanceCompare: false,
				commitChangelog: false,
				useANewLineAfterHeader: false,
				defaultChangelogEntries: "",
				changelogMd: "tmp/CHANGELOG1.md",
				addthistochangelogMd: "tmp/yoast--schema-blocks.md",
			} );
			// Test if there is input we need to add
			if ( ! grunt.file.exists( options.addthistochangelogMd ) ) {
				return;
			}

			const changelog = grunt.file.read( options.changelogMd );
			var currentChangelogSection = "";
			// Console.log( "read: " + changelog );


			// Check if the ## Future Release header already exists

			// eslint-disable-next-line no-control-regex
			const currentChangelogEntriesMatches = changelog.match( new RegExp( "## Future Release\n(.|\n)*?(?=\n## )" ) );
			if  ( currentChangelogEntriesMatches ) {
				currentChangelogSection =  currentChangelogEntriesMatches[ 0 ];
			}
			if ( currentChangelogSection !== "" ) {
				console.log( "READ: " + currentChangelogSection );
			}
			// Console.log( currentChangelogEntriesMatches );
			const changelogBuilder = new ChangelogBuilder( grunt, currentChangelogSection, options.useEditDistanceCompare, options.useANewLineAfterHeader, options.pluginSlug, true );

			const extralines =  grunt.file.read( "tmp/yoast--schema-blocks.md" );
			console.log( extralines );
			changelogBuilder.parseYoastCliGeneratedChangelog( extralines );
			// Console.log( "out " + changelogBuilder.packageChangelog );


			const mergedReadme = changelog.replace( new RegExp( escapeRegExp(  currentChangelogSection ) ), "## Future Release\n" + changelogBuilder.packageChangelog );

			grunt.file.write( options.changelogMd, mergedReadme );

			if ( options.commitChangelog ) {
				// Stage the changed readme.txt.
				grunt.config( "gitadd.addChangelog.files", { src: [ options.changelogMd ] } );
				grunt.task.run( "gitadd:addChangelog" );

				// Check if there is something to commit with `git status` first.
				grunt.config( "gitstatus.checkChangelog.options.callback", function( changes ) {
					// First character of the code checks the status in the index.
					// eslint-disable-next-line max-len
					const hasStagedChangelog = changes.some( change => change.code[ 0 ] !== " " && change.file === options.changelogMd.split( "/" )[ options.changelogMd.split( "/" ).length - 1 ] );

					if ( hasStagedChangelog ) {
						// Commit the changed readme.txt.
						grunt.config( "gitcommit.commitChangelog.options.message", "Add changelog" );
						grunt.task.run( "gitcommit:commitChangelog" );
					} else {
						grunt.log.writeln( "Changelog is unchanged. Nothing to commit." );
					}
				} );

				grunt.task.run( "gitstatus:checkChangelog" );
			}
		}
	);
};
